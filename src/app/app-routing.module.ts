import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { EnviarComponent } from './components/enviar/enviar.component';

const routes: Routes = [
  { path: 'main/:id', component: MainComponent },
  { path: 'enviar', component: EnviarComponent },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
