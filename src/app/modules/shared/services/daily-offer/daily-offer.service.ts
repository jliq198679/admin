import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SharedDailyOfferService {

  constructor(private http: HttpClient) {
  }

  getDailyOfferItems(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/offer-daily/items`);
  }

}
