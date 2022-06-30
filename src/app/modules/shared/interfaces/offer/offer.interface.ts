import { MetaInterface } from './../meta/meta.interface';

export interface OfferInterface extends MetaInterface{
    id?: number;
    name_offer_es?: string;
    name_offer_en?: string;
    description_offer_es?: string;
    description_offer_en?: string;
    price_cup?: number;
    price_usd?: number;
    url_imagen?: string;
    group_offer_id?: number;
    is_promotion?: boolean;
}
