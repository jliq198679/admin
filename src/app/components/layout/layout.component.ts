import { Router } from '@angular/router';
import { AuthService, StorageService } from './../../services';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  title = 'PANEL DE ADMINISTRACIÓN';
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private cdRef:ChangeDetectorRef,
    private observer: BreakpointObserver) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdRef.detectChanges();
  }

  public logout(): void {
    this.authService.logout();
  }

  get isAuthenticated() {
    return this.storageService.isAuthenticated();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
