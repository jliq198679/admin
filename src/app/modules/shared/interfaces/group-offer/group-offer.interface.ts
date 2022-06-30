import { MetaInterface } from './../meta/meta.interface';

export interface GroupOfferInterface extends MetaInterface{
    id: number;
    name_group_es?: string;
    name_group_en?: string;
    category_id?: number;
    category?: GroupOfferInterface
}
