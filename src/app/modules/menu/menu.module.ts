import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MenuLayoutComponent,
  MenuCategoryComponent,
  MenuOfferCardComponent,
  MenuSummaryComponent,
  MenuCheckoutComponent
} from './components';

@NgModule({
  declarations: [
    MenuLayoutComponent,
    MenuCategoryComponent,
    MenuOfferCardComponent,
    MenuSummaryComponent,
    MenuCheckoutComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class MenuModule { }
