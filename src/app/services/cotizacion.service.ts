import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  //urlBase:string = "http://api-desa.asinco.cl/api/";
  urlBase:string = "http://api-sigav.asinco.cl/api/";
	//urlBase:string = "http://localhost:38831/api/";
  
  constructor(private http:HttpClient) { }

  getCotizaciones(_idSegUsuario):Observable<any>{
  	const controlador = "Cotizacion/getCotizacion?_idSegUsuario="+_idSegUsuario;
  	return this.http.get(this.urlBase+controlador)
  }

  inicializaEnvio(_idSegUsuario):Observable<any>{
    const controlador = "Cotizacion/inicializaEnvio?_idSegUsuario="+_idSegUsuario;
    return this.http.get(this.urlBase+controlador)
  }

  grabarCotizacion(_cotizacion:any):Observable<any>{

    //console.log("_cotizacion",_cotizacion)
    _cotizacion = JSON.stringify(_cotizacion)
    _cotizacion= _cotizacion.replace(/#/g,'%23');
    _cotizacion= _cotizacion.replace(/&/g,'%26');
  	const controlador = "Cotizacion/grabarCotizacion?_cotizacion="+_cotizacion;
    return this.http.post(this.urlBase+controlador,{ cotizacion:_cotizacion})
  }


  actualizarCotizacion(_cotizacion:string):Observable<any>{

    _cotizacion = JSON.stringify(_cotizacion)
    _cotizacion= _cotizacion.replace(/#/g,'%23');
    _cotizacion= _cotizacion.replace(/&/g,'%26');
    const controlador = "Cotizacion/actualizarCotizacion?_cotizacion="+_cotizacion;
    return this.http.post(this.urlBase+controlador,{ cotizacion:_cotizacion})
  }

  grabarObsAereo(_idCotizacionNew:number, _obsAereo:string):Observable<any>{   
  
    _obsAereo = _obsAereo.replace(/"/g, "'")
    _obsAereo = _obsAereo.replace(/'/g, "''") 
    _obsAereo= _obsAereo.replace(/#/g,'%23');
    _obsAereo= _obsAereo.replace(/&/g,'%26');

    let json = { obsAereo:_obsAereo}
    _obsAereo = JSON.stringify(json)
    
    let controlador = "Cotizacion/grabarObsAereo?_idCotizacionNew="+_idCotizacionNew+"&_obsAereo="+_obsAereo;
    return this.http.post(this.urlBase+controlador,{ idCotizacionNew: _idCotizacionNew, obsAereo:_obsAereo})
  }
   
  grabarObsTerrestre(_idCotizacionNew:number, _obsTerrestre:string):Observable<any>{   
    _obsTerrestre = _obsTerrestre.replace(/"/g, "'")
    _obsTerrestre = _obsTerrestre.replace(/'/g, "''") 
    _obsTerrestre= _obsTerrestre.replace(/#/g,'%23');
    _obsTerrestre= _obsTerrestre.replace(/&/g,'%26');

    let json = { obsTerrestre:_obsTerrestre}
    _obsTerrestre = JSON.stringify(json)
    let controlador = "Cotizacion/grabarObsTerrestre?_idCotizacionNew="+_idCotizacionNew+"&_obsTerrestre="+_obsTerrestre;
    return this.http.post(this.urlBase+controlador,{ obsTerrestre:_obsTerrestre})
  }
  
  grabarObsLegal(_idCotizacionNew:number, _obsLegal:string):Observable<any>{    
    _obsLegal = _obsLegal.replace(/"/g, "'")
    _obsLegal = _obsLegal.replace(/'/g, "''")
    _obsLegal= _obsLegal.replace(/#/g,'%23');
    _obsLegal= _obsLegal.replace(/&/g,'%26');
    let controlador = "Cotizacion/grabarObsLegal?_idCotizacionNew="+_idCotizacionNew+"&_obsLegal="+_obsLegal;
    return this.http.post(this.urlBase+controlador,{ idCotizacionNew: _idCotizacionNew, obsLegal:_obsLegal})
  }

  enviarCorreo(_correo:string):Observable<any>{
    _correo= JSON.stringify(_correo)
    _correo= _correo.replace(/#/g,'%23');
    _correo= _correo.replace(/&/g,'%26');

    const controlador = "Cotizacion/enviarCorreo?_correo="+_correo;
    return this.http.post(this.urlBase+controlador,{ correo:_correo})
  }

  cambiarEstado(_id:number, _estado:number ):Observable<any>{


    const controlador = "Cotizacion/cambiarEstado?_id="+_id+"&_estado="+_estado;
    return this.http.post(this.urlBase+controlador,{ id:_id, estado:_estado})
  }

  //console.log(JSON.parse(_correo))
  //myVar = myVar.replace(/"/g, "'")
  //myVar = myVar.replace(/'/g, "''")
  //_correo= _correo.replace(/class="[^"]*"/g, "");
  //_correo= _correo.replace(/style="[^"]*"/g, "");
  //_correo= _correo.replace(/'/g, "%27");
  //_correo= _correo.replace(/;/g, "%3B");




}
