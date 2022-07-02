import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'signin-app',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})

export class SignInComponent {
    login: string;
    password1: string;
    pass1_type: boolean = true;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    togglePassField1() {
        this.pass1_type = !this.pass1_type;
    }

    onSubmit(form: NgForm) {
        console.log("you are logging in");
        // this.authService.login(form.value.login, form.value.password);
    }
}