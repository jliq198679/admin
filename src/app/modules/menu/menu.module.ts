import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MenuLayoutComponent,
  MenuCategoryComponent,
  MenuOfferCardComponent,
  MenuSummaryComponent,
  MenuCheckoutComponent,
  MenuMakePaymentComponent,
  MenuDeliveryDataComponent,
  MenuConfirmOrderComponent,
  AddGuarniCarComponent
} from './components';


@NgModule({
  declarations: [
    MenuLayoutComponent,
    MenuCategoryComponent,
    MenuOfferCardComponent,
    MenuSummaryComponent,
    MenuCheckoutComponent,
    MenuConfirmOrderComponent,
    MenuDeliveryDataComponent,
    MenuMakePaymentComponent,
    AddGuarniCarComponent
    
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild()
  ]
})
export class MenuModule { }
