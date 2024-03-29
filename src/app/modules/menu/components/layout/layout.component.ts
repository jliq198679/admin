import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MenuCheckoutComponent } from './../checkout/checkout.component';
import { MenuOfferItemInterface } from './../../../shared/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { SharedDailyOfferService } from './../../../shared/services';
import { Component, OnInit } from '@angular/core';
import { AddGuarniCarComponent } from './../add-guarni-car';
import { startWith } from 'rxjs/operators';
import { SharedCurrencyEnum } from './../../../shared/enums';
import { SharedCurrencyService } from './../../../shared/services';

@Component({
  selector: 'menu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  form: FormGroup;

  dailyOfferItems = [];
  categorySelectedIndex: number = 0;
  selectionCar: MenuOfferItemInterface[] = [];

 typeguarni = [];
 categorySelected: number;

  constructor(
      private dailyOfferService: SharedDailyOfferService,
      public translateService: TranslateService,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private currencyService: SharedCurrencyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDailyOfferItems();
  }

  onAddOfferToCard(selectedOffer: MenuOfferItemInterface) {
    console.log(selectedOffer)
    this.categorySelected = this.dailyOfferItems[this.categorySelectedIndex].id;

    this.dailyOfferService.getTypeGuarni(this.categorySelected).subscribe(data=>{
      this.typeguarni = data;
      // console.log(this.typeguarni);
      if(this.typeguarni.length > 0){
        const dialogRef = this.dialog.open(AddGuarniCarComponent, {
        width: '50%',
        data: this.typeguarni
      });

      dialogRef.afterClosed().subscribe((arrGuarniSelected) => {
        //console.log(arrGuarniSelected)
        //selectedOffer.selected_guarni = arrGuarniSelected;
        this.categorySelected = null;
        this.typeguarni = [];
        const newSelectedOffer = Object.assign({}, selectedOffer)
        newSelectedOffer.selected_guarni = arrGuarniSelected;
        this.selectionCar.push(newSelectedOffer);

      });
      }
      else {
        this.selectionCar.push(selectedOffer);
      }
    });

  }

  onCategorySelected(index: number) {
    this.categorySelectedIndex = index;
  }

  loadDailyOfferItems() {
    this.dailyOfferService.getDailyOfferItems().subscribe(dailyOfferItems=>{
      console.log(dailyOfferItems)
      this.dailyOfferItems = dailyOfferItems;
    })
  }

  name_group(category): string {
    return (this.lang === 'es' ? category.name_group_es : category.name_group_en);
  }

  get lang() {
    return this.translateService.currentLang;
  }

  showCart() {
    if(this.selectionCar.length > 0) {
      const dialogRef = this.dialog.open(MenuCheckoutComponent, {
        width: '100%',
        height: '100%',
        data: this.selectionCar
      });

      dialogRef.afterClosed().subscribe(() => {
        this.selectionCar = [];
      });
    }
  }

  compareWithFunc = (a: any, b: any) => a == b;

  private initForm(): void {
    console.log(navigator.language)
    this.form = this.fb.group({
      currency: ['cup']
    });

    this.currencySelectChangeSubscribe();
  }

  private currencySelectChangeSubscribe() {
    this.form.get('currency').valueChanges
        .pipe(startWith(SharedCurrencyEnum.CUP))
        .subscribe(
          (currency: SharedCurrencyEnum)=>this.currencyService.currency$.next(currency)
        );
  }

}
