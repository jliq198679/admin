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

  constructor(private dailyOfferService: SharedDailyOfferService) { }

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

}
