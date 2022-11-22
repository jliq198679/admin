import { AdminNotificationInterface } from './../../interfaces/notification/notification.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminNotificationService {

  constructor(private http: HttpClient) {
  }

  get(id?: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/push-notification${id ? '/' + id : ''}`);
  }

  datatable(page: number, per_page: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/push-notification?page=${page}&per_page=${per_page}`);
  }

  store(notification: AdminNotificationInterface): Observable<any> {
    return this.http.post(`${environment.apiUrl}/push-notification`, notification);
  }

  update(id: number, notification: AdminNotificationInterface): Observable<any> {
    return this.http.put(`${environment.apiUrl}/push-notification/${id}`, notification);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/push-notification/${id}`);
  }

  send(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/push-notification/send`, {});
  }

}
