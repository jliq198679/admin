import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DailyOfferService {

  constructor(private http: HttpClient) {

  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer-daily${id ? '/' + id : ''}`);
  }

  datatable(page: number, per_page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer-daily?page=${page}&per_page=${per_page}`);
  }

  store(offers: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/offer-daily/package`, { offers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/offer-daily/${id}`);
  }

}
