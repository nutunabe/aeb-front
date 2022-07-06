import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'main-app',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent {
    constructor(public authService: AuthService) { }
}