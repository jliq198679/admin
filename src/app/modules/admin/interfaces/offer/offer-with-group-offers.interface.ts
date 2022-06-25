import { GroupOfferInterface } from '../group-offer/group-offer.interface';
import { OfferInterface } from "./offer.interface";

export interface OfferWithGroupOffersInterface extends OfferInterface {
  group_offer: GroupOfferInterface;
}
