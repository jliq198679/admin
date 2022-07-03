import { TranslateService } from '@ngx-translate/core';
import { SharedDailyOfferService } from './../../../shared/services/daily-offer/daily-offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  dailyOfferItems = [];
  categorySelectedIndex: number = 0;

  constructor(
      private dailyOfferService: SharedDailyOfferService,
      public translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadDailyOfferItems();
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

  }

}
