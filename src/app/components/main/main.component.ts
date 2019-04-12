import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//MODEL
import { Cotizacion } from '../../class/cotizacion';

//SERVICES
import { CotizacionService } from '../../services/cotizacion.service';
import { RepositoryService } from '../../services/repository.service';
import { SortService } from '../../services/sort.service';
//import { FormatDateService } from '../../services/format-date.service';

//LIBRERIAS
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //cotizaciones:any[];
  COTIZACIONES:any[]
  _cotizaciones:any[];
  cotizacionesTotal = -1;

  selectFilter:any[];
  selectFilterSelected:any[];

  //PAGINATION
  //pagConfig:any;
  rows: number= 0;
  currentP: number = 0;

  txtStatus:string="";
  actionStatus:boolean=false;

  private idSegUsuario:string;

  constructor(
    private serviceCot: CotizacionService,
    private repo: RepositoryService,
    private sortService: SortService,
    //private formatD: FormatDateService, 
    private router: Router,
    private route: ActivatedRoute){ 
      //para parametros de ruta ej: main?id=5
      this.route.queryParams.subscribe(params => {
        this.idSegUsuario = params['id'];
        //console.log(this.idSegUsuario)
        if(this.idSegUsuario=="undefined"||this.idSegUsuario==undefined||this.idSegUsuario==null){
          this.idSegUsuario = this.route.snapshot.params.id;
        }
      });
      if(this.idSegUsuario=="undefined"||this.idSegUsuario==undefined||this.idSegUsuario==null){
        alert("Falta parametro");
        //console.log(this.idSegUsuario)
        //window.location.href = "http://desarrollo.sigav.a5/";
      }

      //para variables de ruta ej:Ejemplo: "main/id/:_id /param2/:param2"
      //this.idUsuario = this.route.snapshot.params.id;
    }

  ngOnInit() {

    this.rows= 20;
    this.currentP = 1;

    this.selectFilter=[
      {id:0,nombre:'Seleccione un filtro...'},
      {id:1,nombre:'idVentaCotizacionNew'},
      {id:2,nombre:'fechaViaje'},
      {id:3,nombre:'cliente'},
      {id:4,nombre:'vendedor'},
      {id:5,nombre:'pasajero'},
      {id:6,nombre:'destino'},
      {id:7,nombre:'montoTotalUSD'},
      {id:8,nombre:'montoTotalCLP'}
    ];
    this.selectFilterSelected = this.selectFilter[0];
  	this.serviceCot.getCotizaciones(this.idSegUsuario).subscribe((resp)=>{
      this.COTIZACIONES = resp;
      this._cotizaciones = this.COTIZACIONES;
      if(this.cotizaciones !=null){

        for(let i =0;i<this.cotizaciones.length;i++){
          let soloFecha= this.cotizaciones[i].fechaViaje.substring(0, 10);
          //let res = soloFecha.split("-");
          let res = soloFecha.split("/");
          this.cotizaciones[i].fechaViaje = res[2]+"-"+res[1]+"-"+res[0]
          this.cotizaciones[i].montoTotalUSD = 
            parseFloat(this.cotizaciones[i].montoAereoUSD)+
            parseFloat(this.cotizaciones[i].montoTerrestreUSD)+
            parseFloat(this.cotizaciones[i].montoCargoUSD);

          this.cotizaciones[i].montoTotalCLP = 
            parseInt(this.cotizaciones[i].montoAereoCLP)+
            parseInt(this.cotizaciones[i].montoTerrestreCLP)+
            parseInt(this.cotizaciones[i].montoCargoCLP);

          //this.cotizaciones[i].fechaViaje = this.formatD.formatDate(this.cotizacion[i].fechaViaje)
        }
      }

      //this.pagConfig = { itemsPerPage: 10, currentPage: this.p }
      //console.log(this.cotizaciones)
  	});  

  }

  get cotizaciones(){
    return this._cotizaciones
  }



  loadEnviar(_cotizacion){
    if(_cotizacion=='0'){
      _cotizacion= {estado:true,idSegUsuario:this.idSegUsuario}
      this.repo.setCotizazacion(_cotizacion);
    }else{
      _cotizacion.idSegUsuario = this.idSegUsuario;
      this.repo.setCotizazacion(_cotizacion);
    }
    this.router.navigate(['/enviar']);
  }

  onSorted(event){
    //console.log(event)
    if(event.sortColumn=='idVentaCotizacionNew'||event.sortColumn=='montoTotalUSD'||event.sortColumn=='montoTotalCLP'||event.sortColumn=='fechaViaje'){
      if(event.sortDirection=='asc'){
        this.cotizaciones.sort(function (a, b) {
          if (a[event.sortColumn] > b[event.sortColumn]) {
            return 1;
          }
          if (a[event.sortColumn] < b[event.sortColumn]) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else{
              this.cotizaciones.sort(function (a, b) {
        if (a[event.sortColumn] < b[event.sortColumn]) {
          return 1;
        }
        if (a[event.sortColumn] > b[event.sortColumn]) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      }
    }
    else{
      if(event.sortDirection=='asc'){
        this.cotizaciones.sort(function (a, b) {
          if (a[event.sortColumn].toLowerCase() > b[event.sortColumn].toLowerCase()) {
            return 1;
          }
          if (a[event.sortColumn].toLowerCase() < b[event.sortColumn].toLowerCase()) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }else{
        this.cotizaciones.sort(function (a, b) {
          if (a[event.sortColumn].toLowerCase() < b[event.sortColumn].toLowerCase()) {
            return 1;
          }
          if (a[event.sortColumn].toLowerCase() > b[event.sortColumn].toLowerCase()) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      
    }
    //console.log(this.cotizaciones)
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';
    //console.log("seletFilterSelected", this.selectFilterSelected['nombre'])
    //console.log(criteria)
    if( this.selectFilterSelected['nombre']=='idVentaCotizacionNew' || this.selectFilterSelected['nombre']=='montoTotalUSD' || this.selectFilterSelected['nombre']=='montoTotalCLP'){
      this._cotizaciones = this.COTIZACIONES.filter(cotizacion => cotizacion[this.selectFilterSelected['nombre']].toString().toLowerCase().includes(criteria.toLowerCase()));
      const newTotal = this.cotizaciones.length;
      if (this.cotizacionesTotal !== newTotal) {
        this.cotizacionesTotal = newTotal;
      } else if (!criteria) {
        this.cotizacionesTotal = -1;
      }
    }else{
      this._cotizaciones = this.COTIZACIONES.filter(cotizacion => cotizacion[this.selectFilterSelected['nombre']].toLowerCase().includes(criteria.toLowerCase()));
      const newTotal = this.cotizaciones.length;
      if (this.cotizacionesTotal !== newTotal) {
        this.cotizacionesTotal = newTotal;
      } else if (!criteria) {
        this.cotizacionesTotal = -1;
      }
    }
  }

  onCambiarEstado(id,estado){
    this.serviceCot.cambiarEstado(id,estado).subscribe((resp)=>{
      if(resp==0){
        this.txtStatus="Cotizacion cambiada correctamente";
      }
      else{
        this.txtStatus="Problemas con el servidor";
      }
      this.actionStatus=true;
      setTimeout(()=>{
        this.actionStatus=false;
        this.serviceCot.getCotizaciones(this.idSegUsuario).subscribe((resp)=>{
          setTimeout (() => {
             console.log("Hello from setTimeout");
            this.COTIZACIONES = resp;
            this._cotizaciones = this.COTIZACIONES;
          });
        });
      },3000)
    });
    console.log("idSegUsuario", this.idSegUsuario)

  }

}
