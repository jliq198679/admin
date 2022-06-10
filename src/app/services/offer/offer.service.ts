import { OfferInterface } from './../../interfaces/offer/offer.interface';
import { GroupOfferInterface } from '../../interfaces/group-offer/group-offer.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {

  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer${id ? '/' + id : ''}`);
  }

  datatable(page: number, per_page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer?page=${page}&per_page=${per_page}`);
  }

  store(data: OfferInterface): Observable<any> {
    const formData = new FormData();
    formData.append('name_offer_es', data.name_offer_es);
    formData.append('name_offer_en', data.name_offer_en);
    formData.append('description_offer_es', data.description_offer_es);
    formData.append('description_offer_en', data.description_offer_en);
    formData.append('price_cup', data.price_cup.toString());
    formData.append('price_usd', data.price_usd.toString());
    formData.append('url_imagen', data.url_imagen);
    formData.append('group_offer_id', data.group_offer_id.toString());

    return this.http.post(`${environment.apiUrl}/api/offer`, formData);
  }

  update(data: OfferInterface): Observable<any> {
    /*const formData = new FormData();
    formData.append('name_offer_es', data.name_offer_es);
    formData.append('name_offer_en', data.name_offer_en);
    formData.append('description_offer_es', data.description_offer_es);
    formData.append('description_offer_en', data.description_offer_en);
    formData.append('price_cup', data.price_cup.toString());
    formData.append('price_usd', data.price_usd.toString());
    formData.append('url_imagen', data.url_imagen);
    formData.append('group_offer_id', data.group_offer_id.toString());*/

    return this.http.put(`${environment.apiUrl}/api/offer/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/offer/${id}`);
  }

}
