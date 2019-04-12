import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  constructor(
    private dPipe: DatePipe) { }

  formatDate(date){
  	return this.dPipe.transform(date, 'yyyy-MM-dd');
  }
}
