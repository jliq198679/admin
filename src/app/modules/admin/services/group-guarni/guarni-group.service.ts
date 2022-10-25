import { GroupOfferInterface } from '../../interfaces/group-offer/group-offer.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DataRowOutlet } from '@angular/cdk/table';

export interface GroupGuarniInterface {
  id: number;
  name_side_dish_es?: string;
  name_side_dish_en?: string;
}

@Injectable({
    providedIn: 'root'
})
export class GuarniGroupService {

  constructor(private http: HttpClient) {

  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/type-side-dish`);
  }

  getguarnicategories(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/type-side-dish/${id}`);
  }
/*
  getGroupsWithOffers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/group-offer/offers`);
  }*/

  
  datatable(page: number, per_page: number, category_id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${category_id ? 'side-dish?type_side_dish_id=' + category_id :'api/type-side-dish'}?page=${page}&per_page=${per_page}`);
  }

  

  store(data: GroupGuarniInterface): Observable<any> {
    const formData = new FormData();
    console.log(data);
    if(data.id) {
      formData.append('name_side_dish_es', data.name_side_dish_es);
      formData.append('name_side_dish_en', data.name_side_dish_en);
      formData.append('type_side_dish_id', data.id.toString());
      return this.http.post(`${environment.apiUrl}/api/side-dish`, formData);
    }
    else{
    formData.append('name_type_side_dish_es', data.name_side_dish_es);
    formData.append('name_type_side_dish_en', data.name_side_dish_en);
    return this.http.post(`${environment.apiUrl}/api/type-side-dish`, formData);
    }
  }

  update(data: GroupGuarniInterface): Observable<any> {
    let name_type_side_dish_es= data.name_side_dish_es;
    let name_type_side_dish_en= data.name_side_dish_en;    
    return this.http.put(`${environment.apiUrl}/api/type-side-dish/${data.id}`, {name_type_side_dish_es, name_type_side_dish_en});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/type-side-dish/${id}`);
  }

}
