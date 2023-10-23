import { Component } from '@angular/core';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snoopy-frontend';

  constructor(private customerService: CustomerService){
    if(!this.customerService.isTokenExpired()){
      this.customerService.startTokenExpirationCheck()
    }
  }
}
