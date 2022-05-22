import { OfferGroupListComponent } from './components/offers-groups/offer-group-list/offer-group-list.component';
import { OfferListComponent } from './components/offers/offer-list/offer-list.component';
import { SpecialOfferListComponent } from './components/specials-offers/special-offer-list/special-offer-list.component';
import { DailyOfferListComponent } from './components/daily-offers/daily-offer-list/daily-offer-list.component';
import { AuthGuard } from './guards';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
