import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Resume } from '../resume';
import { HttpService } from '../http.service';

@Component({
    selector: 'resume-app',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.css'],
    providers: [HttpService]
})
export class ResumeComponent {
    myForm: FormGroup;
    resume: Resume;
    constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
        this.myForm = formBuilder.group({
            "firstName": ["", [Validators.required, Validators.pattern("^[А-Я][а-я]*$")]],
            "secondName": ["", [Validators.required, Validators.pattern("^[А-Я][а-я]*$")]],
            "patronymic": ["", [Validators.required, Validators.pattern("^[А-Я][а-я]*$")]],
            "birthdate": ["", [Validators.required]],
            "phoneNumber": ["", [Validators.required]],
            "email": ["", [Validators.required, Validators.pattern("^([a-z0-9]+([-_][a-z0-9]+)*)@(([a-z0-9]+(-[a-z0-9]+)*)\.)+[a-z]+$")]],
            "eduGroup": ["", [Validators.required]],
            "education": formBuilder.array([["", Validators.required]]),
            "eduWorks": ["", [Validators.required]],
            "goal": ["", [Validators.required]],
            "expWork": ["", [Validators.required]],
            "expPractice": ["", [Validators.required]],
            "softSkills": ["", [Validators.required]],
            "hardSkills": ["", [Validators.required]],
            "langKnowledge": ["", [Validators.required]]
        });
    }
    getFormsControls(): FormArray {
        return this.myForm.controls['education'] as FormArray;
    }
    addEducation() {
        (<FormArray>this.myForm.controls["education"]).push(new FormControl("", Validators.required));
    }
    submit() {
        const [day, month, year] = this.myForm.value.birthdate.split('.');
        const birthdate = [year, month, day].join('-');
        this.resume = new Resume(
            this.myForm.value.firstName,
            this.myForm.value.secondName,
            this.myForm.value.patronymic,
            birthdate,
            this.myForm.value.phoneNumber,
            this.myForm.value.email,
            this.myForm.value.eduGroup,
            this.myForm.value.education,
            this.myForm.value.eduWorks,
            this.myForm.value.goal,
            this.myForm.value.expWork,
            this.myForm.value.expPractice,
            this.myForm.value.softSkills,
            this.myForm.value.hardSkills,
            this.myForm.value.langKnowledge,
            this.myForm.value.imgUrl
        )
        this.httpService.postResume(this.resume);
        console.log(this.myForm);
    }
}