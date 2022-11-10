import { GuarniInterface } from './../../interfaces/guarni.interface';
import { GroupGuarniInterface } from '../../interfaces/group-guarni.Interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GuarniService {

  constructor(private http: HttpClient) {

  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/side-dish${id ? '/' + id : ''}`);
  }

  getNotDaily(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/offer/not-daily`);
  }

  datatable(page: number, per_page: number, filters?: any): Observable<any> {
    let query = '';

    if(filters?.category_id) {
      query += `&type_side_dish_id=${filters.category_id}`;
    }

    return this.http.get(`${environment.apiUrl}/side-dish?page=${page}&per_page=${per_page}${query}`);
  }

  store(data: GuarniInterface): Observable<any> {
    console.log(data);
    const formData = new FormData();
    formData.append('name_side_dish_es', data.name_side_dish_es);
    formData.append('name_side_dish_en', data.name_side_dish_en);
    formData.append('price_cup', data.price_cup.toString());
    //formData.append('price_usd', data.price_usd.toString());
    //formData.append('url_imagen', data.url_imagen);
    formData.append('type_side_dish_id', data.type_side_dish_id.toString());

    return this.http.post(`${environment.apiUrl}/api/side-dish`, formData);
  }

  update(data: GuarniInterface): Observable<any> {
    console.log(data);
   /* const formData = new FormData();
    formData.append('name_side_dish_es', data.name_side_dish_es);
    formData.append('name_side_dish_en', data.name_side_dish_en);
    formData.append('price_cup', data.price_cup.toString());
    formData.append('price_usd', data.price_usd.toString());
    //formData.append('url_imagen', data.url_imagen);
    formData.append('type_side_dish_id', data.type_side_dish_id.toString());*/
    const datab = {
      name_side_dish_es: data.name_side_dish_es,
      name_side_dish_en: data.name_side_dish_en,
      price_cup: data.price_cup.toString(),
      price_usd: data.price_usd.toString(),
      type_side_dish_id: data.type_side_dish_id.toString()
    }

    return this.http.put(`${environment.apiUrl}/api/side-dish/${data.id}`, datab);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/side-dish/${id}`);
  }

}
