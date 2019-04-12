import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

//MODEL
import { Cotizacion } from '../../class/cotizacion';

//SERVICES
import { CotizacionService } from '../../services/cotizacion.service';
import { RepositoryService } from '../../services/repository.service';

//LIBRARY
import { Subscription } from 'rxjs';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

//import { FormatDateService } from '../../services/format-date.service';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css'],
  animations: [
    trigger('openClose',[

      transition(':enter',[
      //:enter =   void => * //cuando se crea o entra el elemento
        //style({transform: 'translateX(-100%)'}),
        style({opacity:0, display:'none'}),
        animate(500)
      ]),
      transition(':leave',[
      //:leave =   * => void 
        //animate(300, style({transform: 'translateX(100%)'}))
        animate(0, style({opacity: 1, display:'block'}))
      ])
    ])
  ],
})
export class EnviarComponent implements OnInit {

	cotizacion:any;

	imagenes:Array<any>;
	imagenSelected:any;
  imagenUrl:any;

	actionAereo:boolean;
  actionTerrestre:boolean;
  actionObservaciones:boolean;

  obsAereo:string;
  obsTerrestre:string;
  obsLegal:string;


  htmlContent:string;

  mensaje:string;
  estadoMensaje:boolean;
  

  @ViewChild('editorAereo') editorAereo: QuillEditorComponent
  @ViewChild('editorTerrestre') editorTerrestre: QuillEditorComponent
  //@ViewChild('editorObservacion') editorObservacion: QuillEditorComponent

  @ViewChild('btnEnviar') btnEnviar: ElementRef;

  @ViewChild('selectImg') selectImg;


  isReadOnly = false;
  form: FormGroup;
  modules = {};


  constructor(
    private fb: FormBuilder,
    private serviceCot: CotizacionService,
    private repo: RepositoryService,
    //private formatD: FormatDateService,
    private router: Router) {

    if(this.repo.getCotizacion()==null){
      this.router.navigate(['/main']);
    }

    this.form = fb.group({
      editorAereo: [''],
      editorTerrestre: ['']/*,
      editorObservacion: ['<b>TERMINOS Y CONDICIONES.</b>'
          +'<br><br><br>'
          +'Estos valores son referenciales y pueden variar, sin previo aviso debido a regulaciones tarifarias de las respectivas empresas de transportes, líneas aéreas y hoteles.'
          +'<br>'
          +'Las tarifas referenciales no garantizadas.'
          +'<br>'
          +'Los valores referenciales no aplican para temporada alta o fines de semana largos.'
          +'<br>'
          +'Cotización sujeta a disponibilidad de espacios, tanto en cuanto a pasajes aéreos como disponibilidad hotelera.'
          +'<br>'
          +'Todo cambio o devolución está sujeta a multas y restricciones por parte de los proveedores, detallados en las condiciones específicas de cada compra.'
          +'<br>'
          +'Valores no incluyen cargo de combustibles, de seguridad y tasas de aeropuerto y embarque.'
          +'<br>'
          +'Es de responsabilidad exclusiva del cliente tener sus documentos al día (cédula de identidad, pasaporte si lo requiere, permiso notarial si viaja con  menores de 18 años) antes de su viaje.'
          +'<br>'
          +'Es responsabilidad del cliente consultar a su ejecutivo por la tramitación de visas, vacunas que se requieran, y requerimientos particulares,  dependiendo del destino.'
          ]*/
    });

  }

  ngOnInit() {
    //console.log(this.repo.getCotizacion())
    this.mensaje="";
    this.estadoMensaje=false;

    this.imagenes = [
      //{id:1, nombre: 'CHILE', url:'/assets/images/img_test/chile.jpg'},
      //{id:2, nombre: 'EUROPA', url:'/assets/images/img_test/europa.jpg'}
      {id:1, nombre: 'CHILE', url:'/cotizacion/assets/images/img_test/chile.jpg'},
      {id:2, nombre: 'EUROPA', url:'/cotizacion/assets/images/img_test/europa.jpg'}
    ];

    this.obsLegal = '<b>TERMINOS Y CONDICIONES.</b>'
          +'<br><br><br>'
          +'Estos valores son referenciales y pueden variar, sin previo aviso debido a regulaciones tarifarias de las respectivas empresas de transportes, líneas aéreas y hoteles.'
          +'<br>'
          +'Las tarifas referenciales no garantizadas.'
          +'<br>'
          +'Los valores referenciales no aplican para temporada alta o fines de semana largos.'
          +'<br>'
          +'Cotización sujeta a disponibilidad de espacios, tanto en cuanto a pasajes aéreos como disponibilidad hotelera.'
          +'<br>'
          +'Todo cambio o devolución está sujeta a multas y restricciones por parte de los proveedores, detallados en las condiciones específicas de cada compra.'
          +'<br>'
          +'Valores no incluyen cargo de combustibles, de seguridad y tasas de aeropuerto y embarque.'
          +'<br>'
          +'Es de responsabilidad exclusiva del cliente tener sus documentos al día (cédula de identidad, pasaporte si lo requiere, permiso notarial si viaja con  menores de 18 años) antes de su viaje.'
          +'<br>'
          +'Es responsabilidad del cliente consultar a su ejecutivo por la tramitación de visas, vacunas que se requieran, y requerimientos particulares,  dependiendo del destino.'

    this.cotizacion = new Cotizacion(0,0,0,'','','',0,'','','','','',0,0,0,0,0,0,0,0)/*,'','','')*/

    let _cot = this.repo.getCotizacion();
    console.log("_cot",_cot)
    if(_cot.estado){
      //console.log("_cot",_cot)
      this.cotizacion.idSegUsuario = _cot.idSegUsuario;
      this.imagenSelected = this.imagenes[0].id;
      this.imagenUrl = this.imagenes[0].url;
      this.serviceCot.inicializaEnvio(_cot.idSegUsuario)
      .subscribe((resp)=>{
        this.cotizacion.emailPara = resp[0].emailPara;
        this.cotizacion.vendedor = resp[0].vendedor;
        this.cotizacion.tipoCambio = resp[0].tipoCambio;
        console.log(this.cotizacion)
      });
    }
    else{
      //alert("///")
      //let _cot = this.repo.getCotizacion();
      console.log(_cot)
      this.cotizacion = new Cotizacion(_cot.idVentaCotizacionNew,
          _cot.idSegUsuario,
          _cot.idVentaEstadoCotizacionNew,
          _cot.emailPara,
          _cot.emailCopia,
          _cot.idVentaImagen,
          _cot.tipoCambio,
          _cot.fechaViaje,
          _cot.cliente,
          _cot.vendedor,
          _cot.pasajero,
          _cot.destino,
          _cot.montoAereoUSD,
          _cot.montoTerrestreUSD,
          _cot.montoCargoUSD,
          _cot.montoTotalUSD,
          _cot.montoAereoCLP,
          _cot.montoTerrestreCLP,
          _cot.montoCargoCLP,
          _cot.montoTotalCLP);/*,
          _cot.obsAereo,
          _cot.obsTerrestre,
          _cot.obsLegal);*/
      this.obsAereo=_cot.obsAereo;
      this.obsTerrestre=_cot.obsTerrestre;
      //this.obsLegal=_cot.obsLegal;

      //console.log(this.cotizacion)

      let index = this.imagenes.findIndex(img=> img.id==_cot.idVentaImagen )
      this.imagenSelected = this.imagenes[index].id;
      this.imagenUrl = this.imagenes[index].url;
      


      this.calcularTotalCLP();
      this.calcularTotalUSD();

      this.form = this.fb.group({
        editorAereo: [this.obsAereo],
        editorTerrestre: [this.obsTerrestre]/*,
        editorObservacion: [this.obsLegal]*/
      });


    }

    //console.log(this.cotizacion)
    
    this.actionAereo=false
    this.actionTerrestre=true
    this.actionObservaciones=true

    this.form
      .controls
      .editorAereo
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        //console.log('native fromControl value changes with debounce', data)
        this.obsAereo = data;
    });

    this.form
      .controls
      .editorTerrestre
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        //console.log('native fromControl value changes with debounce', data)
        this.obsTerrestre = data;
    });
    /*
    this.form
      .controls
      .editorObservacion
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        //console.log('native fromControl value changes with debounce', data)
        this.obsLegal = data;
    });*/
  }

  calcularTotalUSD():void{
    this.cotizacion.montoAereoCLP = this.multiplicarValores(this.cotizacion.montoAereoUSD);
    this.cotizacion.montoTerrestreCLP = this.multiplicarValores(this.cotizacion.montoTerrestreUSD);
    this.cotizacion.montoCargoCLP = this.multiplicarValores(this.cotizacion.montoCargoUSD);


    this.calcularTotal()
    //console.log(this.cotizacion)
  }

  calcularTotalCLP():void{
    this.cotizacion.montoAereoUSD = this.dividirValores(this.cotizacion.montoAereoCLP);
    this.cotizacion.montoTerrestreUSD = this.dividirValores(this.cotizacion.montoTerrestreCLP);
    this.cotizacion.montoCargoUSD = this.dividirValores(this.cotizacion.montoCargoCLP);

    this.calcularTotal()
    //console.log(this.cotizacion)
  }

  updatePrice(event){
    console.log(event)
  }

  multiplicarValores(value){
    if(value==0){
      return 0
    }else{
      return (value*this.cotizacion.tipoCambio).toFixed(0)
    }
  }

  dividirValores(value){
    if(value==0){
      return 0
    }else{
      return (value/this.cotizacion.tipoCambio).toFixed(2)
    }
  }

  calcularTotal():void{
    this.cotizacion.montoTotalUSD = (parseFloat(this.cotizacion.montoAereoUSD)+parseFloat(this.cotizacion.montoTerrestreUSD)+parseFloat(this.cotizacion.montoCargoUSD)).toFixed(2);
    this.cotizacion.montoTotalCLP = (parseFloat(this.cotizacion.montoAereoCLP)+parseFloat(this.cotizacion.montoTerrestreCLP)+parseFloat(this.cotizacion.montoCargoCLP)).toFixed(0);

  }



  changeObservacion(tipo):void{
    switch (tipo) {
      case "a":
        this.actionAereo=false;
        this.actionTerrestre=true;
        this.actionObservaciones=true;
        break;
      case "t":
        this.actionAereo=true;
        this.actionTerrestre=false;
        this.actionObservaciones=true;
        break;
      case "o":
        this.actionAereo=true;
        this.actionTerrestre=true;
        this.actionObservaciones=false;
        break;
    }
  }

  updateValues():void{
    this.calcularTotalCLP();
    this.calcularTotalUSD()
  }

  //getCotizacion(){
  //  this.serviceCot.getCotizaciones().subscribe((resp)=>{
  //    //console.log(resp)
  //  });
  //}

  grabarCotizacion():void{
    if(this.obsAereo==null){
      this.obsAereo='';
    }
    if(this.obsTerrestre==null){
      this.obsTerrestre='';
    }
    /*if(this.obsLegal==null){
      this.obsLegal='';
    }*/
    this.cotizacion.idSegUsuario = 1;
    this.cotizacion.idVentaImagen = this.imagenSelected;
    this.cotizacion.idVentaEstadoCotizacionNew = 1;

    let index = this.imagenes.findIndex(img=> img.id==this.imagenSelected) 
    this.imagenUrl = this.imagenes[index].url


    if(this.cotizacion.idVentaCotizacionNew==0){
      this.serviceCot.grabarCotizacion(this.cotizacion).subscribe((resp)=>{
        this.cotizacion.idVentaCotizacionNew = resp;
        this.serviceCot.grabarObsAereo(this.cotizacion.idVentaCotizacionNew, this.obsAereo).subscribe((resp)=>{
          //console.log("agregado");
        });
        this.serviceCot.grabarObsTerrestre(this.cotizacion.idVentaCotizacionNew, this.obsTerrestre).subscribe((resp)=>{
          //console.log("agregado");
        });
        this.serviceCot.grabarObsLegal(this.cotizacion.idVentaCotizacionNew, this.obsLegal).subscribe((resp)=>{
          //console.log("agregado");
        });
        this.btnEnviar.nativeElement.click();
      });
    }
    if(this.cotizacion.idVentaCotizacionNew>0){
      this.serviceCot.actualizarCotizacion(this.cotizacion).subscribe((resp)=>{

        this.cotizacion.idVentaCotizacionNew = resp;
        this.serviceCot.grabarObsAereo(this.cotizacion.idVentaCotizacionNew, this.obsAereo).subscribe((resp)=>{
          //console.log("agregado");
        });
        this.serviceCot.grabarObsTerrestre(this.cotizacion.idVentaCotizacionNew, this.obsTerrestre).subscribe((resp)=>{
          //console.log("agregado");
        });
        /*this.serviceCot.grabarObsLegal(this.cotizacion.idVentaCotizacionNew, this.obsLegal).subscribe((resp)=>{
          console.log("agregado");
        });*/
        this.btnEnviar.nativeElement.click();
      });
    }
  }

  enviarCorreo():void{
    let _correo:any = {
      de : 'sigav@asinco.cl',
      para : this.cotizacion.emailCopia,
      cc : this.cotizacion.emailPara,
      bcc : '',
      asunto : 'Cotizacion sigav',
      //mensaje : this.generateBody(),
      mensaje: '',
      ip_Origen : '',
      nombreArchivo : '',
      archivo : '',
      conOutput : 1,
      ruta : '',
      idSegUsuario : 1,
      idVentaCotizacionNew: this.cotizacion.idVentaCotizacionNew
    };

    this.serviceCot.enviarCorreo(_correo).subscribe((resp)=>{
      let estado = resp
      if(estado){
        this.estadoMensaje=true;
        this.mensaje="Correo enviado correctamente";
        this.btnEnviar.nativeElement.click();
      }
      else{
        this.estadoMensaje=true;
        this.mensaje="Problemas al enviar correo";
        this.btnEnviar.nativeElement.click();
      }
    });
  }

  volver():void{
    this.router.navigate(['/main', this.cotizacion.idSegUsuario]);
  }

  /*
  generateBody():string{
    let body = "";
    body+="<!DOCTYPE html>"
      +"<html lang=''en''>"
      +"<head>"
      +"  <meta charset=''UTF-8''>"
      +"  <title>Document</title>"
      +"</head>"
      +"<body style=''margin:1%;padding:1%;''>"
      +"  <div style=''width: 100%;display: inline-block;''>"
      +"    <div style=''width: 100%;display: inline-block;border: 1px groove;''>"
      +"      <div style=''width: 45%; margin-left: 25px; float: left;''>"
      +"        <img src=''https://www.andinadelsud.com/archivosapoyo_87/images/etickets/header-logo-2.jpg'' alt='' width=''300'' height=''100''>"
      +"      </div>"
      +"      <div style=''width:45%; float: right; margin-right: 25px;float:right;''>"
      +"        <b style=''float:right;''>Cotizacion: "+this.cotizacion.idVentaCotizacionNew+"</b><br>"
      +"        <b style=''float:right;''>Valor Tipo Cambio: "+this.cotizacion.tipoCambio+"</b>"
      +"      </div>"
      +"    </div>"
      +"    <!--DATOS Y VALORES-->"
      +"    <div style=''width: 100%;display: inline-block;border: 1px groove;''>"
      +"      <div style=''width: 45%; float:left; border: 1px groove;''>"
      +"        <div style=''background-color: rgb(41,23,107);border-radius: 1px;color: white;margin-bottom: 2px;margin-top: 2px;padding-bottom: 2px;padding-top: 2px;''>"
      +"          <h5 style=''margin: 0;padding: 0;''>Datos</h5>"
      +"        </div>"
      +"        <table>"
      +"          <tr>"
      +"            <td>Fecha:</td>"
      +"            <td>"+this.cotizacion.fechaViaje+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Cliente:</td>"
      +"            <td>"+this.cotizacion.fechaViaje+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Vendedor:</td>"
      +"            <td>"+this.cotizacion.vendedor+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Pax:</td>"
      +"            <td>"+this.cotizacion.pasajero+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Destino</td>"
      +"            <td>"+this.cotizacion.destino+"</td>"
      +"          </tr>"
      +"        </table>"
      +"      </div>"
      +"      <div style=''width: 25%; float:left; margin-left: 2px; margin-right: 2px; border: 1px groove;''>"
      +"        <div style=''background-color: rgb(41,23,107);border-radius: 1px;color: white;margin-bottom: 2px;margin-top: 2px;padding-bottom: 2px;padding-top: 2px;''>"
      +"          <h5 style=''margin: 0;padding: 0;''>Valores USD</h5>"
      +"        </div>"
      +"        <table>"
      +"          <tr>"
      +"            <td>Aereo:</td>"
      +"            <td>"+this.cotizacion.montoAereoUSD+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Terrestre:</td>"
      +"            <td>"+this.cotizacion.montoTerrestreUSD+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Cargo:</td>"
      +"            <td>"+this.cotizacion.montoCargoUSD+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Total:</td>"
      +"            <td>"+this.cotizacion.montoTotalUSD+"</td>"
      +"          </tr>"
      +"        </table>"
      +"      </div>"
      +"      <div style=''width: 25%; float:left; border: 1px groove;''>"
      +"        <div style=''background-color: rgb(41,23,107);border-radius: 1px;color: white;margin-bottom: 2px;margin-top: 2px;padding-bottom: 2px;padding-top: 2px;''>"
      +"          <h5 style=''margin: 0;padding: 0;''>Valores CLP</h5>"
      +"        </div>"
      +"        <table>"
      +"          <tr>"
      +"            <td>Aereo:</td>"
      +"            <td>"+this.cotizacion.montoAereoCLP+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Terrestre:</td>"
      +"            <td>"+this.cotizacion.montoTerrestreCLP+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Cargo:</td>"
      +"            <td>"+this.cotizacion.montoCargoCLP+"</td>"
      +"          </tr>"
      +"          <tr>"
      +"            <td>Total:</td>"
      +"            <td>"+this.cotizacion.montoTotalCLP+"</td>"
      +"          </tr>"
      +"        </table>"
      +"      </div>"
      +"    </div>"
      +"    <!--OBSERVACIONES-->"
      +"    <div style=''width: 100%;display: inline-block;border: 1px groove;''>"
      +"      <!--AEREO-->"
      +"      <div style=''width: 100%;display: inline-block;border: 1px groove;''>"
      +"        <div style=''background-color: rgb(41,23,107);border-radius: 1px;color: white;margin-bottom: 2px;margin-top: 2px;padding-bottom: 2px;padding-top: 2px;''>"
      +"          <h5 style=''margin: 0;padding: 0;''>Aereo</h5>"
      +"        </div>"
      +"        "+this.formatObs(this.obsAereo)+""
      +"      </div>"
      +"      <!--TERRESTRE-->"
      +"      <div style=''width: 100%;display: inline-block;border: 1px groove;''>"
      +"        <div style=''background-color: rgb(41,23,107);border-radius: 1px;color: white;margin-bottom: 2px;margin-top: 2px;padding-bottom: 2px;padding-top: 2px;''>"
      +"          <h5 style=''margin: 0;padding: 0;''>Terrestre</h5>"
      +"        </div>"
      +"        "+this.formatObs(this.obsTerrestre)+""
      +"      </div>"
      +"      <!--OBSERVACION-->"
      +"      <div style=''width: 100%;display: inline-block;border: 1px groove;''>"
      +"        <div style=''background-color: rgb(41,23,107);border-radius: 1px;color: white;margin-bottom: 2px;margin-top: 2px;padding-bottom: 2px;padding-top: 2px;''>"
      +"          <h5 style=''margin: 0;padding: 0;''>Observación</h5>"
      +"        </div>"
      +"        "+this.formatObs(this.obsLegal)+""
      +"      </div>"
      +"    </div>"
      +"  </div>"
      +"</body>"
      +"</html>";
    return body;
  }

  formatObs(myVar){
    myVar = myVar.replace(/"/g, "'")
    myVar = myVar.replace(/'/g, "''")
    return myVar;
  }
  */



}
