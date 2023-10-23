import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //STIAMO DICENDO CHE QUESTO SERVICE è DISPONIBILE A TUTTI (root)
})
export class ServiceProvaService {
  persone = [
    {nome:"luca",cognome: "rossi", isOnline: true},
    {nome:"marco",cognome: "verdi", isOnline: false},
    {nome:"anna", cognome: "bianchi", isOnline: true}
  ]
  constructor() { }
}
