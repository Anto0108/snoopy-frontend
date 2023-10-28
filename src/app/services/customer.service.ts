import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, interval, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME, BASE_API_URL, CUSTOMER_BASE_API_URL, BASE_SITE_URL, BEARER } from '../utility/const';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Post } from '../model/post.model';
import { Comment } from 'src/app/model/comment.model';

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
    return this.http.post(this.basePath+'/signup', customer).pipe(
      map(response => {
        if(response !== null){
          window.location.href = BASE_SITE_URL + '/login';
          return true;
        }
        return false;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  loginCustomer(customer: {}){
    return this.http.post(this.basePath+'/login', customer, { observe: 'response' }).pipe(
      map(response => {
        if(response.body !== null){
          const headers = response.headers;
          const authToken = headers.get('Authorization');
          
          if (authToken) {
            sessionStorage.setItem(TOKEN_NAME, authToken);
          }
          this.startTokenExpirationCheck();
          return response.body;
        }
        return null;
      }),
      catchError(error => {
          return throwError(error);
      })
    );
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
  
  sendComment(commentModel: {}, postId: number){
    if(this.getToken !== null){
      let token = BEARER + this.getToken();
      let headers = new HttpHeaders()
      headers = headers.set('Authorization', token)

      return this.http.post(BASE_API_URL + CUSTOMER_BASE_API_URL + "/addComment?id="+postId, commentModel, { headers: headers, observe: 'response' }).pipe(
          map(response => {
              if (response !== null) {
                  return response;
              }
              return null;
          }),
          catchError(error => {
              console.error('Error fetching posts:', error);
              return of(null);
          })
      );
    }
    
    return of(null);
  }

  getAllPost(): Observable<Post[]  | null>{
    let token = BEARER + this.getToken();
    
    return this.http.get(BASE_API_URL + CUSTOMER_BASE_API_URL + "/", { observe: 'response' }).pipe(
      map(response => {
        if (response.body && Array.isArray(response.body)) {
            return response.body as Post[];
        }
        return null;
      }),
      catchError(error => {
          console.error('Error fetching posts:', error);
          return of(null);
      })
    );
  }

  getAllCommentByPostId(postId: number): Observable<Comment[]  | null>{
    return this.http.get(BASE_API_URL + CUSTOMER_BASE_API_URL + "/getAllCommentByPostId/"+postId, { observe: 'response' }).pipe(
      map(response => {
          if (response !== null) {
              return response.body as Comment[];
          }
          return null;
      }),
      catchError(error => {
          console.error('Error fetching posts:', error);
          return of(null);
      })
    );
  }

  getPostForThePage(id: number){
    return this.http.get(BASE_API_URL + CUSTOMER_BASE_API_URL + "/getPostById/"+id, { observe: 'response' }).pipe(
      map(response => {
        if (response.body) {
          return response.body as Post;
        }
        return null;
      }),
      catchError(error => {
          console.error('Error fetching posts:', error);
          return of(null);
      })
    );
  }

  activeAccount(id: string){
    return this.http.get(BASE_API_URL + CUSTOMER_BASE_API_URL + '/active?id='+id, { observe: 'response' }).pipe(
      map(response => {
        if (response.body) {
          console.log(response.body)
          return response.body;
        }
        return null;
      }),
      catchError(error => {
          console.error(error);
          return throwError(error);
      })
    );
  }

  deactivateNewsLetter(id: string){
    return this.http.get(BASE_API_URL + CUSTOMER_BASE_API_URL + '/deactivateNewsLetter?id='+id, { observe: 'response' }).pipe(
      map(response => {
        if (response.body) {
          console.log(response.body)
          return response.body;
        }
        return null;
      }),
      catchError(error => {
          console.error(error);
          return throwError(error);
      })
    );
  }

}
