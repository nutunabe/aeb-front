import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(private router: Router) { }
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
    auth;

    ngDoCheck() {
        this.auth = history.state.auth;
        console.log(this.auth);
        if (this.router.url === '/signup' || this.router.url === '/signin') {
            this.togglePadding = false;
            this.includeHeader = false;
            this.includeFooter = false;
        } else {
            this.togglePadding = true;
            this.includeHeader = true;
            this.includeFooter = true;
        }
    }
}