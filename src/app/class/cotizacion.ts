export class Cotizacion {

	idVentaCotizacionNew:number;
	idSegUsuario:number;
	idVentaEstadoCotizacionNew:number;
	emailPara:string;
	emailCopia:string;
	idVentaImagen:string;
	tipoCambio:number;
	fechaViaje:string;
	cliente:string;
	vendedor:string;
	pasajero:string;
	destino:string;
	montoAereoUSD:number;
	montoTerrestreUSD:number;
	montoCargoUSD:number;
	montoTotalUSD:number;
	montoAereoCLP:number;
	montoTerrestreCLP:number;
	montoCargoCLP:number;
	montoTotalCLP:number;
	obsAereo:string;
	obsTerrestre:string;
	obsLegal:string;

	constructor(
		_idVentaCotizacionNew:number,
		_idSegUsuario:number,
		_idVentaEstadoCotizacionNew:number,
		_emailPara:string,
		_emailCopia:string,
		_idVentaImagen:string,
		_tipoCambio:number,
		_fechaViaje:string,
		_cliente:string,
		_vendedor:string,
		_pasajero:string,
		_destino:string,
		_montoAereoUSD:number,
		_montoTerrestreUSD:number,
		_montoCargoUSD:number,
		_montoTotalUSD:number,
		_montoAereoCLP:number,
		_montoTerrestreCLP:number,
		_montoCargoCLP:number,
		_montoTotalCLP:number)/*,
		_obsAereo:string,
		_obsTerrestre:string,
		_obsLegal:string)*/{
		
		this.idVentaCotizacionNew = _idVentaCotizacionNew;
		this.idSegUsuario = _idSegUsuario;
		this.idVentaEstadoCotizacionNew = _idVentaEstadoCotizacionNew;
		this.emailPara = _emailPara;
		this.emailCopia = _emailCopia;
		this.idVentaImagen = _idVentaImagen;
		this.tipoCambio = _tipoCambio;
		this.fechaViaje = _fechaViaje;
		this.cliente = _cliente;
		this.vendedor = _vendedor;
		this.pasajero = _pasajero;
		this.destino = _destino;
		this.montoAereoUSD = _montoAereoUSD,
		this.montoTerrestreUSD = _montoTerrestreUSD,
		this.montoCargoUSD = _montoCargoUSD,
		this.montoTotalUSD = _montoTotalUSD,
		this.montoAereoCLP = _montoAereoCLP,
		this.montoTerrestreCLP = _montoTerrestreCLP,
		this.montoCargoCLP = _montoCargoCLP,
		this.montoTotalCLP = _montoTotalCLP/*,
		this.obsAereo = _obsAereo;
		this.obsTerrestre = _obsTerrestre;
		this.obsLegal = _obsLegal;*/
	}
}
