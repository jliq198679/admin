import { MenuOfferCardComponent } from './components/offer-card/offer-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebRoutingModule } from './web-routing.module';
import { ContainerComponent } from './components/container';
import { PresentationComponent } from './components/presentation/presentation.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChefComponent } from './components/chef/chef.component';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminMenuCartComponent, MenuModalComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ContainerComponent,
    PresentationComponent,
    SpecialsComponent,
    AboutComponent,
    MenuComponent,
    ChefComponent,
    ContactComponent,
    GalleryComponent,
    FooterComponent,
    MenuModalComponent,
    AdminMenuCartComponent,
    MenuOfferCardComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class WebModule { }
