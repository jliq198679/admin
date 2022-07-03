import { SharedDailyOfferService } from './../../../shared/services/daily-offer/daily-offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  dailyOfferItems = []

  constructor(private dailyOfferService: SharedDailyOfferService) { }

  ngOnInit(): void {
    this.loadDailyOfferItems();
  }

  loadDailyOfferItems() {
    this.dailyOfferService.getDailyOfferItems().subscribe(dailyOfferItems=>{
      console.log(dailyOfferItems)
      this.dailyOfferItems = dailyOfferItems;
    })
  }

}
