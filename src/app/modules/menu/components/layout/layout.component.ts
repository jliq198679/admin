import { MatDialog } from '@angular/material/dialog';
import { MenuCheckoutComponent } from './../checkout/checkout.component';
import { MenuOfferItemInterface } from './../../../shared/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { SharedDailyOfferService } from './../../../shared/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  dailyOfferItems = [];
  categorySelectedIndex: number = 0;
  selectionCar: MenuOfferItemInterface[] = [];

  constructor(
      private dailyOfferService: SharedDailyOfferService,
      public translateService: TranslateService,
      public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadDailyOfferItems();
  }

  onAddOfferToCard(selectedOffer: MenuOfferItemInterface) {
    console.log(selectedOffer)
    this.selectionCar.push(selectedOffer);
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

      });
    }
  }



}
