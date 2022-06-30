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
    password: string;
    mode;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(v => {
            if (v.mode == false) {
                this.Logout();
            }
        });
    }

    onSubmit(form: NgForm) {
        console.log("you are logging in");
        this.authService.login(form.value.login, form.value.password);
    }

    Logout() {
        console.log("AAAAAAAAAAAA")
        this.authService.logout();
        this.router.navigate(['/'], { state: { auth: true } });
    }
}