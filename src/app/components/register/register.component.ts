import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { BASE_SITE_URL } from 'src/app/utility/const';

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
      phone: ['', Validators.required],
      newsLetter: []
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

  error: string | null = null;
  onSubmit() {
    const passwordValue = this.loginForm.get('password')?.value;
    const repeatPassword = this.loginForm.get('repeatPassword')?.value;
    
    let password;

    if(passwordValue === repeatPassword) {
      if(passwordValue.length > 8){
        password = passwordValue;
    
        const customer = {
          name: this.loginForm.get('name')?.value,
          surname: this.loginForm.get('surname')?.value,
          phone: this.loginForm.get('phone')?.value,
          email: this.loginForm.get('email')?.value,
          password: password,
          newsLetter: this.loginForm.value.newsLetter
        }
        
        this.customerService.registrationCustomer(customer).subscribe(
          result => {},
          error => {
            this.error = error.error.error;
            console.log(this.error);
          }
        );
      }else{
        this.error = 'La password deve avere almeno 8 caratteri tra cui alcuni caratteri speciali.';
      }
    }else{
      this.error = 'Le password devono coincidere.';
    }
  }
}
