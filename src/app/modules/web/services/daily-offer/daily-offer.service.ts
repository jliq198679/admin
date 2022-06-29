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
    return this.http.get(`${environment.apiUrl}/api/offer-daily${id ? '/' + id : ''}`);
  }

  getCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer-daily/category`);
  }

  getSubCategoryOffers(subCategory_id?: any): Observable<any> {
    let query = '';

    if(subCategory_id) {
      query += `?subCategory_id=${subCategory_id}`;
    }

    return this.http.get(`${environment.apiUrl}/offer-daily${query}`);
  }

  getSubCategory(category_id: string, filters?: any): Observable<any> {
    let query = '';

    if(filters?.category_id) {
      query += `?category_id=${filters.category_id}`;
    }

    if(filters?.subCategory_id) {
      query += `?subCategory_id=${filters.subCategory_id}`;
    }

    return this.http.get(`${environment.apiUrl}/offer-daily/get-subCategory/${category_id}${query}`);
  }

  datatable(page: number, per_page: number, filters?: any): Observable<any> {
    let query = '';

    if(filters?.category_id) {
      query += `&category_id=${filters.category_id}`;
    }

    if(filters?.subCategory_id) {
      query += `&subCategory_id=${filters.subCategory_id}`;
    }
    return this.http.get(`${environment.apiUrl}/offer-daily?page=${page}&per_page=${per_page}${query}`);
  }

  store(offers: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/offer-daily/package`, { offers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/offer-daily/${id}`);
  }

}
