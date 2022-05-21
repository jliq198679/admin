import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Administración del Restaurant';
  public isAuthenticated = false;

  public logout(): void {
    // todo
  }
}
