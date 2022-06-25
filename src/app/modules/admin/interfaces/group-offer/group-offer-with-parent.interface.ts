import { GroupOfferInterface } from './group-offer.interface';

export interface GroupOfferWithParentInterface extends GroupOfferInterface {
    category: GroupOfferInterface;
}
