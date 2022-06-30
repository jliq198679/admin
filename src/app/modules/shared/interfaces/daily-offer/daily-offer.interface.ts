import { MetaInterface } from './../meta/meta.interface';

export interface DailyOfferInterface extends MetaInterface {
  id?: number;
  offer_id?: number;
  count_offer?: number;
  price_cup?: number;
  price_usd?: number;
}
