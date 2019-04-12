import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { DatePipe } from '@angular/common';

//COMPONENTS
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { EnviarComponent } from './components/enviar/enviar.component';
import { HeaderComponent } from './components/header/header.component';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';

//SERVICES
import { CotizacionService } from './services/cotizacion.service';
import { RepositoryService } from './services/repository.service';
import { SortService } from './services/sort.service';

//DIRECTIVE
import { TwoDecimalDirective } from './directives/two-decimal.directive';
import { CeroDecimalDirective } from './directives/cero-decimal.directive';
import { SortableTableDirective } from './directives/sortable-table.directive';
//import { FormatDateService } from './services/format-date.service';

//LIBRERIAS
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSortableModule } from 'ngx-sortable';



@NgModule({
  declarations: [
    AppComponent,
    EnviarComponent,
    MainComponent,
    HeaderComponent,
    SortableColumnComponent,
    TwoDecimalDirective,
    CeroDecimalDirective,
    SortableTableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    QuillModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSortableModule
  ],
  providers: [
    CotizacionService,
    RepositoryService,
    SortService
    //FormatDateService
    //DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
