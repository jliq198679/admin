import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PayloadWebService {

  constructor(private http: HttpClient) {

  }

  get(frame_name: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/frame-web/${frame_name}`);
  }

  update(frame_name: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/frame-web/${frame_name}`, data); //
  }
}
