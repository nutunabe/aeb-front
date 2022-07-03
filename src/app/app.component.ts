import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { Resume } from './resume';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})
export class AppComponent {
    constructor(private router: Router, private authService: AuthService, private httpService: HttpService) { }
    items = [];
    links = [
        {
            name: 'Согласие на обработку данных',
            link: '#'
        },
        {
            name: 'Служба поддержки',
            link: '#'
        },
        {
            name: 'Политика конфидениальности',
            link: '#'
        }
    ];
    includeHeader: boolean = true;
    includeFooter: boolean = true;
    includeTop: boolean = true;
    includeMenu: boolean = false;
    includeBottom: boolean = true;
    togglePadding: boolean = true;
    resumes: Resume[] = [];

    ngOnInit() {
        this.authService.checkExpiry();
        this.httpService.getResumes().subscribe((data: Resume[]) => this.resumes = data);
    }

    ngDoCheck() {
        if (this.router.url === '/signup' || this.router.url === '/signin') {
            this.togglePadding = this.includeHeader = this.includeFooter = false;
        } else {
            this.togglePadding = this.includeHeader = this.includeFooter = true;
        }
    }

    logout() {
        this.authService.logout();
    }
}