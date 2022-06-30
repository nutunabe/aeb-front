import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

    postUser(login: string, email: string, password: string) {
        return this.http.post('http://localhost:8080/api/auth/signup', { username: login, email: email, password: password })
            .subscribe((resp: any) => {
                if (resp.message == 'User CREATED') {
                    this.router.navigate(['/']);
                }
            });
    }

    getData(){
        return this.http.get('assets/user.json')
    }
}