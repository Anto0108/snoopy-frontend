import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BASE_API_URL, BEARER, ADMIN_BASE_API_URL } from '../utility/const';
import { CustomerService } from './customer.service';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { PostAdminModel } from '../model/post.admin.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private customerService: CustomerService, private http: HttpClient) { }

  addNewPost(formData: FormData) {
    if (this.customerService.getToken() !== null) {
      let token = BEARER + this.customerService.getToken();
      let headers = new HttpHeaders().set('Authorization', token);

      return this.http.post(BASE_API_URL + ADMIN_BASE_API_URL + "/newPost", formData, { headers: headers }).pipe(
        map((response: any) => {
            return response;
        })
      );
    }
    return of(null);
}

  private postIDSource = new BehaviorSubject<number>(0);
  currentPostID = this.postIDSource.asObservable();

  changePostID(id: number) {
    this.postIDSource.next(id);
  }

  getAllPostForDashboard(){
    if (this.customerService.getToken() !== null) {
      let token = BEARER + this.customerService.getToken();
      let headers = new HttpHeaders().set('Authorization', token);

      return this.http.get<PostAdminModel[]>(BASE_API_URL + ADMIN_BASE_API_URL + "/getAll", { headers: headers })
    }
    return of([]);
  }


}
