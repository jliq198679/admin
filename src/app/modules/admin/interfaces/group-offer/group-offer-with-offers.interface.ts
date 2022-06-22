import { OfferInterface } from './../offer/offer.interface';
import { GroupOfferInterface } from './group-offer.interface';

export interface GroupOfferWithOffersInterface extends GroupOfferInterface {
    offers: OfferInterface[];
}
