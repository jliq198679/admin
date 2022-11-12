import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminSettingDeliveryPlaceService {

  constructor(private http: HttpClient) {
  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/setting/delivery-place${id ? '/' + id : ''}`);
  }

  datatable(page: number, per_page: number, municipality_id?: number): Observable<any> {
    let query = '';

    if(municipality_id) {
      query += `&municipality_id=${municipality_id}`;
    }

    return this.http.get(`${environment.apiUrl}/setting/delivery-place?page=${page}&per_page=${per_page}${query}`);
  }

  store(deliveryPlace: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/setting/delivery-place`, deliveryPlace);
  }

  update(id: number, deliveryPlace: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/setting/delivery-place/${id}`, deliveryPlace);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/setting/delivery-place/${id}`);
  }

}
