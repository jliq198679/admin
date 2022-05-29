import { GroupOfferInterface } from './../../interfaces/group-offer/group-offer.interface';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OfferGroupService {

  constructor(private http: HttpClient) {

  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group-offer${id ? '/' + id : ''}`);
  }

  datatable(page: number, per_page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group-offer?page=${page}&per_page=${per_page}`);
  }

  store(data: GroupOfferInterface): Observable<any> {
    const formData = new FormData();
    formData.append('name_group_es', data.name_group_es);
    formData.append('name_group_en', data.name_group_en);

    return this.http.post(`${environment.apiUrl}/api/group-offer`, formData);
  }

  update(data: GroupOfferInterface): Observable<any> {
    const formData = new FormData();
    formData.append('name_group_es', data.name_group_es);
    formData.append('name_group_en', data.name_group_en);

    return this.http.post(`${environment.apiUrl}/api/group-offer/${data.id}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/group-offer/${id}`);
  }

}
