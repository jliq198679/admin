import { GroupOfferInterface } from './../../interfaces/group-offer/group-offer.interface';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';
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

  getSubcategories(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group-offer/get-subCategory/${id}`);
  }

  getGroupsWithOffers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group-offer/offers`);
  }

  datatable(page: number, per_page: number, category_id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group-offer${category_id ? '/get-subCategory/' + category_id : ''}?page=${page}&per_page=${per_page}`);
  }

  //interfaces con las api para las guariciones

  datatableguarniciones(page: number, per_page: number, category_id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/type-side-dish${category_id ? '/get-subCategory/' + category_id : ''}?page=${page}&per_page=${per_page}`);
  }
  
  
  storeoffersidedish(groupoffer: number, typesidedish: number[]): Observable<any> {
     /*  console.log(groupoffer);
       console.log(typesidedish);*/
      let group_offer_id = groupoffer;
      let type_side_dish_ids = typesidedish;
    if(typesidedish.length==0){
      return this.http.delete(`${environment.apiUrl}/api/group-offer/associate/type-side-dish/${group_offer_id}`) 
    }
    return this.http.post(`${environment.apiUrl}/api/group-offer/associate/type-side-dish`,{group_offer_id,type_side_dish_ids});
  }

  
  deleteoffersidedish(groupoffer: number): Observable<any> {
    let group_offer_id = groupoffer;
    return this.http.delete(`${environment.apiUrl}/api/group-offer/associate/type-side-dish/${group_offer_id}`);
  }
  //--------------------------------------------------------------------------------

  store(data: GroupOfferInterface): Observable<any> {
    const formData = new FormData();
    formData.append('name_group_es', data.name_group_es);
    formData.append('name_group_en', data.name_group_en);

    if(data.category_id) {
      formData.append('category_id', data.category_id.toString());
    }

    return this.http.post(`${environment.apiUrl}/api/group-offer`, formData);
  }

  update(data: GroupOfferInterface): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/group-offer/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/group-offer/${id}`);
  }

}
