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
    formData.append('name_description_es', data.name_offer_es);
    formData.append('name_description_en', data.name_offer_en);
    formData.append('image', data.name_offer_es);
    formData.append('group_offer_id', data.name_offer_en);

    return this.http.post(`${environment.apiUrl}/api/offer`, formData);
  }

  update(data: OfferInterface): Observable<any> {
    const formData = new FormData();
    formData.append('name_offer_es', data.name_offer_es);
    formData.append('name_offer_en', data.name_offer_en);
    formData.append('name_description_es', data.name_offer_es);
    formData.append('name_description_en', data.name_offer_en);
    formData.append('image', data.name_offer_es);
    formData.append('group_offer_id', data.name_offer_en);

    return this.http.post(`${environment.apiUrl}/api/offer/${data.id}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/offer/${id}`);
  }

}
