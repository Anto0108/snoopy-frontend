import { Component, Input, OnInit } from '@angular/core';
import { ServiceProvaService } from './services/service-prova.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'snoopy-frontend';

  constructor(private servizio: ServiceProvaService){

  }
  ngOnInit():void{
    console.log("AppComponent", this.servizio.persone)
  }
  onInput(e: Event){
    this.title = (<HTMLInputElement>e.target).value;
  }
  onClick(e: Event){
    this.title = ""
  }
}
