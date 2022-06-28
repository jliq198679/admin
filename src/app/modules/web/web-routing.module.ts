import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './components';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },*/
  {
    path: '',
    component: ContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
