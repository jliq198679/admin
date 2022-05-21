import { Router } from '@angular/router';
import { LoginInterface, SessionClass } from './../../interfaces';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {
  }

  login(user: LoginInterface): Observable<SessionClass> {
      return this.http.post(`${environment.apiUrl}/oauth/token`, user);
  }

  logout(): void{
    this.storageService.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
