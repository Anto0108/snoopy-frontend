import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME, BASE_API_URL, CUSTOMER_BASE_API_URL, BASE_SITE_URL, BEARER } from '../utility/const';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  getToken(){
    return sessionStorage.getItem(TOKEN_NAME) !== null ? sessionStorage.getItem(TOKEN_NAME) : null;
  }

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private _snackBar: MatSnackBar) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  basePath = BASE_API_URL + CUSTOMER_BASE_API_URL;

  registrationCustomer(customer: {}){
    return this.http.post(this.basePath+'/signup', customer).subscribe(data => {
      if(data !== null){
        window.location.href = BASE_SITE_URL + '/login';
      }
    })
  }

  loginCustomer(customer: {}){
    return this.http.post(this.basePath+'/login', customer, { observe: 'response' }).subscribe(response => {
      if(response.body !== null){
        const headers = response.headers;
        const authToken = headers.get('Authorization');
        
        if (authToken) {
          sessionStorage.setItem(TOKEN_NAME, authToken);
        }
        this.startTokenExpirationCheck();
        window.location.href = BASE_SITE_URL;
      }
    })
  }

  openSnackBar() {
    const snackbar = this._snackBar.open("La sessione è scaduta, rifai il login", "close");

    let wasDismissedByAction = false;
    const logoutTimer = setTimeout(() => {
      if (!wasDismissedByAction) {
        this.logout();
      }
    }, 30000);

    snackbar.afterDismissed().subscribe(result => {
      if (result.dismissedByAction) {
        wasDismissedByAction = true;
        clearTimeout(logoutTimer);
        this.logout();
      }
    });
  }

  tokenExpirationChecker$: any;

  startTokenExpirationCheck() {
    this.tokenExpirationChecker$ = interval(5000)
      .pipe(
        map(() => {
          if (this.isTokenExpired()) {
            this.openSnackBar()
          }
        })
      ).subscribe();
    }

  stopTokenExpirationCheck() {
    if (this.tokenExpirationChecker$) {
      this.tokenExpirationChecker$.unsubscribe();
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    window.location.href = 'http://localhost:4200/';
  }

  isTokenExpired(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return true;  
    
    return this.jwtHelper.isTokenExpired(token);
  }


  handleError(error: any) {
    console.error('Si è verificato un errore!', error);
  }

  checkPermissions(): Observable<string> {
    if (this.getToken() !== null) {
        let token = BEARER + this.getToken();
        const headers = new HttpHeaders().set('Authorization', token);

        return this.http.get(BASE_API_URL + CUSTOMER_BASE_API_URL, { headers: headers, observe: 'response', responseType: 'text' }).pipe(
            map(response => {
                if (response.body !== null) {
                    return response.body;
                }
                return '';
            })
        );
    }
    return of('');
  }

}
