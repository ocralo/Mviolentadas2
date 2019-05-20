import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  nombre ="";
  constructor() { }

  getName(){
return this.nombre;
  }
  setName(name){
    this.nombre=name;
  }
}
