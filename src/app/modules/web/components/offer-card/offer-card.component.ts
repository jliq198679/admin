import { StarRatingColor } from './../../../shared/components';
import { MenuOfferItemInterface } from './../../../shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'menu-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class MenuOfferCardComponent implements OnInit {

  @Input() dailyOffer: MenuOfferItemInterface;

  rating:number = 5;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
  }

  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }

  get lang() {
    return this.translateService.currentLang;
  }

  name_offer(offer): string {
    return (this.lang === 'es' ? offer.name_offer_es : offer.name_offer_en);
  }

  description_offer(offer): string {
    return (this.lang === 'es' ? offer.description_offer_es : offer.description_offer_en);
  }

  addOfferToCar(dailyOffer: MenuOfferItemInterface) {

  }

  /*
  evalRateOffer(dailyOffer: MenuOfferItemInterface) {

  }

  shareOffer(dailyOffer: MenuOfferItemInterface) {

  }
  */

}
