import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'signin-app',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})

export class SignInComponent {
    login: string;
    password1: string;
    pass1_type: boolean = true;

    constructor(private authService: AuthService) { }

    togglePassField1() {
        this.pass1_type = !this.pass1_type;
    }

    onSubmit(form: NgForm) {
        this.authService.login(form.value.login, form.value.password1);
    }
}