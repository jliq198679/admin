import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SpecialOfferService {

  constructor(private http: HttpClient) {

  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer-promotion${id ? '/' + id : ''}`);
  }

  datatable(page: number, per_page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer-promotion?page=${page}&per_page=${per_page}`);
  }

  store(offer_id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/offer-promotion`, { offer_id });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/offer-promotion/${id}`);
  }

}
