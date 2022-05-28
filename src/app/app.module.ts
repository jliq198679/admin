import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  DashboardComponent,
  LoginComponent,
  LayoutComponent
} from './components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OfferListComponent } from './components/offers/offer-list/offer-list.component';
import { OfferEditorComponent } from './components/offers/offer-editor/offer-editor.component';
import { OfferGroupListComponent } from './components/offers-groups/offer-group-list/offer-group-list.component';
import { OfferGroupEditorComponent } from './components/offers-groups/offer-group-editor/offer-group-editor.component';
import { SpecialOfferEditorComponent } from './components/specials-offers/special-offer-editor/special-offer-editor.component';
import { SpecialOfferListComponent } from './components/specials-offers/special-offer-list/special-offer-list.component';
import { DailyOfferListComponent } from './components/daily-offers/daily-offer-list/daily-offer-list.component';
import { DailyOfferEditorComponent } from './components/daily-offers/daily-offer-editor/daily-offer-editor.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { OurStoryComponent } from './components/our-story/our-story.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ChefComponent } from './components/chef/chef.component';
import { AuthInterceptorService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    OfferListComponent,
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
    ChefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false}
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500, horizontalPosition: 'right'}
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
