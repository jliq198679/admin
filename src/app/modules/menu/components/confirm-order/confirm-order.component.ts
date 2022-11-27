import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuOfferItemInterface } from './../../../shared/interfaces';
import { GuarniInterface } from './../../../admin/interfaces';
import { SharedCurrencyService } from './../../../shared/services/currency/currency.service';
@Component({
  selector: 'menu-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class MenuConfirmOrderComponent implements OnInit {

  @Input() selectionCar: MenuOfferItemInterface[] = [];
  displayedColumns: string[] = ['position', 'name_offer_es', 'price_cup', 'price_usd', /*'is_promotion',*/ 'operations'];
  dataSource = new MatTableDataSource<MenuOfferItemInterface>(this.selectionCar);

  ELEMENT_DATA: GuarniInterface[];

  constructor(public translateService: TranslateService,
              public currencyService: SharedCurrencyService) { }

  ngOnInit(): void { 
    console.log(this.selectionCar);
    this.dataSource = new MatTableDataSource<MenuOfferItemInterface>(this.selectionCar);
    //this.ELEMENT_DATA = this.selectionCar[0].selected_guarni;

    
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

  offerImage(offer): string {
    return offer.url_imagen;
  }

  addGuarni(guarni){
    guarni.cant_selected++;
  }

  removeGuarni(guarni){
    if(guarni.cant_selected>1){guarni.cant_selected--;}
  }

  deleteGuarni(index,ind){
   this.selectionCar[index].selected_guarni.splice(ind,1); 
   console.log(index,ind);
  }

  deleteOferta(index){
    this.selectionCar.splice(index,1); 
  }
  
  subTotalusd(data){
    let val = data.price_usd;
    for(let i of data.selected_guarni){val+=(i.price_usd*i.cant_selected);}
    return val;
  }

  subTotalcup(data){
    let val = data.price_cup;
    for(let i of data.selected_guarni){val+=(i.price_cup*i.cant_selected);}
    return val;
  }

  public priceWithCurrency(price: number) {
    return this.currencyService.calcPrice(price);
  }
  
  public Moneda(){
   return this.currencyService.typeCurrency();
  }
}
