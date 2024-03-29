import { SharedCurrencyService } from './../../../shared/services/currency/currency.service';
import { TranslateService } from '@ngx-translate/core';
import { StarRatingColor } from '../../../shared/components';
import { MenuOfferItemInterface } from '../../../shared/interfaces';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class MenuOfferCardComponent implements OnInit {

  @Input() dailyOffer: MenuOfferItemInterface;
  @Output() selected = new EventEmitter<MenuOfferItemInterface>()

  rating:number = 5;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(
    public translateService: TranslateService,
    public currencyService: SharedCurrencyService
  ) { }

  ngOnInit(): void {
  }

  onRatingChanged(rating){
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
    this.selected.emit(dailyOffer);
  }

  public calcPrice(price: number) {
    return this.currencyService.calcPrice(price);
  }

  public priceWithCurrency(price: number) {
    return this.currencyService.priceWithCurrency(price);
  }


}
