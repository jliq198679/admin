import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SharedCurrencyEnum } from '../../enums';
import { SettingService } from './../../../admin/services/setting/setting.service';

@Injectable({
    providedIn: 'root'
})
export class SharedCurrencyService {

  currency$: BehaviorSubject<SharedCurrencyEnum> = new BehaviorSubject(SharedCurrencyEnum.CUP);
  exchangeRate$: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(private settingService: SettingService) {
    this.currencyChangeSubscribe();
  }

  currencyChangeSubscribe() {
    this.currency$.subscribe(
      (currency: SharedCurrencyEnum)=>{
        this.settingService.get().subscribe(
          setting=>{
            if(setting && setting.exchange_rate) {
              const exchangeRate = currency === SharedCurrencyEnum.USD ? 1 : setting.exchange_rate;
              this.exchangeRate$.next(exchangeRate);
            }
          }
        );
      }
    )
  }

  calcPrice(price: number): number {
    return this.exchangeRate$.value * price;
  }

  priceWithCurrency(price: number): string {
    return this.calcPrice(price) + ' ' + this.currency$.value.toLocaleUpperCase();
  }
  
  typeCurrency(){ return this.currency$.value.toLocaleUpperCase();}
}
