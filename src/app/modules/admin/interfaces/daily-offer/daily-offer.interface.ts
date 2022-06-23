import { GroupOfferInterface } from './../group-offer';
import { OfferInterface } from './../offer';

export interface DailyOfferInterface extends OfferInterface {
  group_offer: GroupOfferInterface;
}
