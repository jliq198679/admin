import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { environment } from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  message:any = null;

  constructor(public translate: TranslateService) {
    this.langInit();
  }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  private langInit() {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
    this.translate.use('en').subscribe(()=>{
      this.translate.use('es')
    })

  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

}
