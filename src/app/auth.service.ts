import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
    uri = 'http://localhost:8080/api/auth/';

    constructor(private http: HttpClient, private router: Router) { }

    login(login: string, password: string) {
        this.http.post(this.uri + 'signin', { username: login, password: password })
            .subscribe((response: any) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('type', response.type);
                localStorage.setItem('id', response.id);
                localStorage.setItem('username', response.username);
                localStorage.setItem('email', response.email);
                localStorage.setItem('roles', response.roles);
                localStorage.setItem('expDate', jwt_decode(response.token)['exp']);
                this.router.navigate(['/']);
            });
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    checkExpiry() {
        if (Math.floor(Date.now() / 1000) >= +localStorage.getItem('expDate')) { this.logout(); }
    }

    public get isLoggedIn(): boolean {
        return (localStorage.getItem('token') !== null);
    }
}