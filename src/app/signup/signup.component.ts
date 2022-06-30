import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
    selector: 'signup-app',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [HttpService]
})

export class SignUpComponent {
    login: string;
    email: string;
    password: string;

    constructor(private httpService: HttpService) { }

    onSubmit(form: NgForm) {
        this.httpService.postUser(form.value.login, form.value.email, form.value.password);
    }
}