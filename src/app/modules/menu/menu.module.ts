import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
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
    MatInputModule,
    MatFormFieldModule,
    TranslateModule.forChild()
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule]
})
export class MenuModule { }
