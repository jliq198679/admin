import { OfferDailyItemInterface } from "./offer-daily-item.interface";

export interface OfferDailyInterface {
    frame_web_id: number;
    offers?: OfferDailyItemInterface[];
}