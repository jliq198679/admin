import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';

import {
  OfferListComponent ,
  OfferGroupListComponent,
  SpecialOfferListComponent,
  DailyOfferListComponent,
  GalleryComponent,
  DashboardComponent,
  LoginComponent,
  LayoutComponent,
  GuarniGroupListComponent,
  GuarniListComponent,
  SettingComponent
} from './components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'daily-offers',
        component: DailyOfferListComponent
      },
      {
        path: 'special-offers',
        component: SpecialOfferListComponent
      },
      {
        path: 'offers',
        component: OfferListComponent
      },
      {
        path: 'offer-groups',
        component: OfferGroupListComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'guarni-group',
        component: GuarniGroupListComponent
      },
      {
        path: 'guarni',
        component: GuarniListComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
