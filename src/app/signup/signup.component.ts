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
    password1: string;
    password2: string;
    pass1_type: boolean = true;
    pass2_type: boolean = true;
    password_equal: boolean = true;

    constructor(private httpService: HttpService) { }

    togglePassField1() {
        this.pass1_type = !this.pass1_type;
    }

    togglePassField2() {
        this.pass2_type = !this.pass2_type;
    }

    checkPasswords(form: NgForm){
        return form.value.password1 === form.value.password2;
    }

    onSubmit(form: NgForm) {
        console.log(form.value.password1);
        if (form.value.password1 === form.value.password2) {
            this.httpService.postUser(form.value.login, form.value.email, form.value.password1);
        } else {
            this.password_equal = false;
        }
    }
}