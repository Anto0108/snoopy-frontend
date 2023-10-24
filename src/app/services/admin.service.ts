import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BASE_API_URL, BEARER, ADMIN_BASE_API_URL, CUSTOMER_BASE_API_URL } from '../utility/const';
import { CustomerService } from './customer.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable, catchError, of } from 'rxjs';
import { Post } from './../model/post.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private customerService: CustomerService, private http: HttpClient) { }

  addNewPost(post: {}) {
    if (this.customerService.getToken() !== null) {
        let token = BEARER + this.customerService.getToken();
        let headers = new HttpHeaders()
        headers = headers.set('Authorization', token)

        return this.http.post(BASE_API_URL + ADMIN_BASE_API_URL + "/newPost", post, { headers: headers }).pipe(
            map((response: any) => {
                console.log("ID2: " + response);
                return response;
            })
        );
    }
    return of(null);
  }

  getAllPost(): Observable<Post[]  | null>{
    if(this.customerService.getToken() !== null){
      let token = BEARER + this.customerService.getToken();
      let headers = new HttpHeaders()
      headers = headers.set('Authorization', token)
      
      return this.http.get(BASE_API_URL + ADMIN_BASE_API_URL + "/", { headers: headers, observe: 'response' }).pipe(
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
    
    return of(null);
  }
}
