import { AuthService, StorageService } from './../../services';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  title = 'Administración del Restaurant';

  public logout(): void {
    this.authService.logout();
  }

  get isAuthenticated() {
    return this.storageService.isAuthenticated();
  }
}
