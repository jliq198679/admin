import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminPushNotificationService {

  constructor(private http: HttpClient) {
  }

  send(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/push-notification/send`, {});
  }

}
