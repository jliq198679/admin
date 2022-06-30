import { DailyOfferInterface } from './../daily-offer';
import { GroupOfferInterface } from './../group-offer';
import { OfferInterface } from './../offer';

export interface MenuOfferItemInterface extends OfferInterface {
    group_offer?: GroupOfferInterface
    offer_daily?: DailyOfferInterface
}
