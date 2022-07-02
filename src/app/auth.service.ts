import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
                this.router.navigate(['/']);
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        this.router.navigate(['/']);
    }

    public get isLoggedIn(): boolean {
        return (localStorage.getItem('token') !== null);
    }
}