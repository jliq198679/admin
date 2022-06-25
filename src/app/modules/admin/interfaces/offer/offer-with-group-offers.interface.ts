import { GroupOfferWithParentInterface } from '../group-offer';
import { OfferInterface } from "./offer.interface";

export interface OfferWithGroupOffersInterface extends OfferInterface {
  group_offer: GroupOfferWithParentInterface;
}
