import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

	cotizacion:any=null;

  constructor() { }

  setCotizazacion(_cotizacion){
  	this.cotizacion = _cotizacion;
  }

  getCotizacion(){
  	return this.cotizacion;
  }
}
