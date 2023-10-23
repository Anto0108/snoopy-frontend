import { Input, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ServiceProvaService } from '../services/service-prova.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  //MODEL (PARTE LOGICA DELL'APPLICAZIONE)
  //@Input è un decoratore
  //@Input() data :any;

  constructor(private servizioProva: ServiceProvaService){}

  ngOnInit(): void{
    console.log(this.servizioProva.persone)
  }
}
