import { ConfirmDialogService } from './services/confirm-dialog/confirm-dialog.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  OfferListComponent ,
  OfferEditorComponent,
  OfferGroupListComponent,
  OfferGroupEditorComponent,
  SpecialOfferEditorComponent,
  SpecialOfferListComponent,
  DailyOfferListComponent,
  DailyOfferEditorComponent,
  PresentationComponent,
  OurStoryComponent,
  GalleryComponent,
  ChefComponent,
  ConfirmDialogComponent,
  DashboardComponent,
  LoginComponent,
  LayoutComponent,
  ContactComponent
} from './components';

const COMPONENTS = [
  OfferListComponent ,
  OfferEditorComponent,
  OfferGroupListComponent,
  OfferGroupEditorComponent,
  SpecialOfferEditorComponent,
  SpecialOfferListComponent,
  DailyOfferListComponent,
  DailyOfferEditorComponent,
  PresentationComponent,
  OurStoryComponent,
  GalleryComponent,
  ChefComponent,
  ConfirmDialogComponent,
  DashboardComponent,
  LoginComponent,
  LayoutComponent,
  ContactComponent
];


@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    ConfirmDialogService
  ]
})
export class AdminModule { }
