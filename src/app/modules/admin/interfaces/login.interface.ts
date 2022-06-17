import { environment } from './../../../../../src/environments/environment.prod';

export interface LoginInterface {
    readonly grant_type: string;
    readonly scope: string;
    username: string;
    password: string;
    client_id: number;
    client_secret: string;
}

export class LoginClass implements LoginInterface {
    readonly grant_type: string =  "password";
    readonly scope: string = '*';
    username: string = '';
    password: string = '';
    client_id: number = environment.client_id;
    client_secret: string = environment.client_secret;

    constructor(_username: string, _password: string) {
        this.username = _username;
        this.password = _password;
    }
}
