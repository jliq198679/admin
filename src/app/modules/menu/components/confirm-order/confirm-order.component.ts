import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'menu-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class MenuConfirmOrderComponent implements OnInit {

  @Input() selectionCar;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void { console.log(this.selectionCar)
  }

  get lang() {
    return this.translateService.currentLang;
  }

  name_offer(offer): string {
    return (this.lang === 'es' ? offer.name_offer_es : offer.name_offer_en);
  }
  
  number_guarni(item){
    return item.selected_guarni.length;
  }

  name_guarni(item){
    return item.name_side_dish_es;
  }

  cant_selected(item){
    return item.cant_selected;

  }
}
