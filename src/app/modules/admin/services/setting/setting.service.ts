import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/setting`);
  }

  update(setting: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/setting`, setting);
  }

}
