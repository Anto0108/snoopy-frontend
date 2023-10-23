import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  loginForm: FormGroup; //mi prende il form dalla view
  newEmail = new FormControl('', [Validators.required, Validators.email]);


  constructor(private fb: FormBuilder, private customerService: CustomerService){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required]
    });

  }

  get email() {
    return this.loginForm.get('email');
  }

  getErrorMessage() {
    if (this.newEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.newEmail.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    const passwordValue = this.loginForm.get('password')?.value;
    const repeatPassword = this.loginForm.get('repeatPassword')?.value;
    
    let password;

    if(passwordValue === repeatPassword) password = passwordValue;

    const customer = {
      name: this.loginForm.get('name')?.value,
      surname: this.loginForm.get('surname')?.value,
      phone: this.loginForm.get('phone')?.value,
      email: this.loginForm.get('email')?.value,
      password: password,
    }

    this.customerService.registrationCustomer(customer);
  }
}
