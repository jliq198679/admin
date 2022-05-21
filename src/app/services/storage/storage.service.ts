import { SessionClass, UserClass } from './../../interfaces';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession: SessionClass | null;

  constructor() {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: SessionClass): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): SessionClass | null {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <SessionClass> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): SessionClass | null {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): UserClass | null {
    // TODO: Es una sola cuenta de usuario la del administrador
    return {};
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() !== null);
  };

  getCurrentToken(): string | null {
    const session = this.getCurrentSession();
    return (session && session.access_token) ? session.access_token : null;
  };

}
