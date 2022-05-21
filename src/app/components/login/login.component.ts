import { AuthService, StorageService } from '../../services';
import { SessionClass, LoginInterface, LoginClass } from './../../interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
    password: string = '';
    public submitted: Boolean = false;
    public error?: {code: number, message: string} | null;
    loginValid = true;

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router) {}

    ngOnInit() {}

    login() {
        const user: LoginInterface = new LoginClass(this.username, this.password);

        this.submitted = true;
        this.error = null;

        this.authService.login(user).subscribe(
            data => this.correctLogin(data),
            error => {
              this.loginValid = false;
            }
        );
    }

    private correctLogin(data: SessionClass){
        // TODO: Revisar se marea el guard cuando se trata de inicial luego de un intento sin autorizacion al dashboard
        this.storageService.setCurrentSession(data);
        this.router.navigate(['/dashboard']);
    }
}
