import { DailyOfferService } from './../../services/daily-offer/daily-offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {

  categories: any[]
  isSubcategory = false;

  constructor(private dailyOfferService: DailyOfferService) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  showSubcategories(id) {
    this.dailyOfferService.getSubCategory(id).subscribe(categories=>{
      this.categories = categories;
      this.isSubcategory = true;
    })
  }

  back() {
    this.isSubcategory = false;
    this.loadCategories();
  }

  loadCategories() {
    this.dailyOfferService.getCategory().subscribe(categories=>{
      this.categories = categories;
    })
  }

}
