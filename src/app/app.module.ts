import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ServiceComponent } from './components/service/service.component';
import { HomepageContentComponent } from './components/homepage-content/homepage-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { DatePipe } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ActiveAccountComponent } from './components/active-account/active-account.component';
import { DashboardAmministratoreComponent } from './components/dashboard-amministratore/dashboard-amministratore.component';
import { DisattivaNewsletterComponent } from './components/disattiva-newsletter/disattiva-newsletter.component';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    CarouselComponent,
    AboutComponent,
    ContactsComponent,
    ServiceComponent,
    HomepageContentComponent,
    FooterComponent,
    InfoComponent,
    NewPostComponent,
    PostComponent,
    ErrorPageComponent,
    ActiveAccountComponent,
    DashboardAmministratoreComponent,
    DisattivaNewsletterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    MatSnackBarModule,
    FormsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }