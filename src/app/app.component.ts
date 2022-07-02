import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(private router: Router, private authService: AuthService) { }
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