import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ServiceComponent } from './components/service/service.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ActiveAccountComponent } from './components/active-account/active-account.component';
import { DashboardAmministratoreComponent } from './components/dashboard-amministratore/dashboard-amministratore.component';
import { DisattivaNewsletterComponent } from './components/disattiva-newsletter/disattiva-newsletter.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactsComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'nuovo-post', component: NewPostComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'error-page/:errorCode', component: ErrorPageComponent},
  {path: 'active-account', component: ActiveAccountComponent},
  {path: 'dashboard-amministratore', component: DashboardAmministratoreComponent},
  {path: 'disattiva-newsletter', component: DisattivaNewsletterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
