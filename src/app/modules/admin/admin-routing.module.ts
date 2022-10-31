import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';

import {
  OfferListComponent ,
  OfferGroupListComponent,
  SpecialOfferListComponent,
  DailyOfferListComponent,
  PresentationComponent,
  OurStoryComponent,
  GalleryComponent,
  ChefComponent,
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
        path: 'presentation',
        component: PresentationComponent
      },
      {
        path: 'our-story',
        component: OurStoryComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'chef',
        component: ChefComponent
      },
      {
        path: 'guarni-group',
        component: GuarniGroupListComponent
      },
      {
        path: 'guarni',
        component: GuarniListComponent
      }
      ,
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
