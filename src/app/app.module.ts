//Parte principale di tutta l'applicazione

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    //TUTTI I COMPONENTI O DIRETTIVE
    AppComponent,
    HomepageComponent,
  ],
  imports: [
    //MODULI
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [
    //POTREMMO INSERIRE TUTTI I SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
