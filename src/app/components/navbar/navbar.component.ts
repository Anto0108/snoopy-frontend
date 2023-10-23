import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { BASE_SITE_URL } from '../../utility/const';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  perm :string | undefined;
  
  constructor(private customerService: CustomerService){}
  ngOnInit(): void {
    this.checkPermission();
  }

  checkPermission(){
    this.customerService.checkPermissions().subscribe(result => {
      this.perm = result;
    });
  }

  logout(){
    this.customerService.logout()
  }

  redirectLogin(){
    window.location.href = BASE_SITE_URL + '/login';
  }

  redirectSignUp(){
    window.location.href = BASE_SITE_URL + '/register';
  }

  getToken(){
    return this.customerService.getToken();
  }

  
}
