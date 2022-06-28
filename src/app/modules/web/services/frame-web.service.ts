import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class FrameWebService {

  publicPath = `${environment.apiUrl}/frame-web`;
  privatePath = `${environment.apiUrl}/api/frame-web`

  constructor(private http: HttpClient) { }

  public get(){
    return this.http.get(this.publicPath);
  }
}
