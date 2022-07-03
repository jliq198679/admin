import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuLayoutComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
