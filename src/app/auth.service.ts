import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})


export class AuthService {

    uri = 'http://localhost:8080/api/auth';
    token;

    constructor(private http: HttpClient, private router: Router) { }

    login(login: string, password: string) {
        this.http.post(this.uri + '/signin', { username: login, password: password })
            .subscribe((response: any) => {
                this.router.navigate(['/']);
                this.http.post('assets/user.json', { token: response.token });
            });
    }
    logout() {
    }
}