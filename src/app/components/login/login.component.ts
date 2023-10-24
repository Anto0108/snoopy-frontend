import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup; //mi prende il form dalla view
  newEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder, private customerService: CustomerService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  }

  get email() {
    return this.loginForm.get('email');
  }

  getErrorMessage() {
    if (this.newEmail.hasError('required')) {
      return 'Devi inserire una mail.';
    }

    return this.newEmail.hasError('email') ? 'Mail non valida.' : '';
  }

  onSubmit() {

    const customer = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.customerService.loginCustomer(customer);
  }

}
