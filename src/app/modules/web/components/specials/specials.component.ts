import { TranslateService } from '@ngx-translate/core';
import { OfferInterface } from './../../interfaces';
import { SpecialOfferService } from './../../services/special-offer/special-offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {

  specialOffer: OfferInterface[] = [];

  constructor(
    private specialOfferService: SpecialOfferService,
    public translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.specialOfferService.get().subscribe(resp=>{
      this.specialOffer = resp.data;
    })

  }

  name(offer: OfferInterface): string {
    return (this.lang === 'es' ? offer.name_offer_es : offer.name_offer_en);
  }

  description(offer: OfferInterface): string {
    return (this.lang === 'es' ? offer.description_offer_es : offer.description_offer_en);
  }

  get lang() {
    return this.translateService.currentLang;
  }

}
