import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Resume } from '../resume';
import { HttpService } from '../http.service';
import { DomSanitizer } from '@angular/platform-browser';

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    let imageToShow;
    reader.addEventListener("load", () => {
        imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
    return imageToShow;
}

@Component({
    selector: 'resume-app',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.css'],
    providers: [HttpService]
})
export class ResumeComponent {
    myForm: FormGroup;
    resume: Resume;
    flag: boolean = false;
    fileName = '';
    avatar: any;
    constructor(private formBuilder: FormBuilder, private httpService: HttpService, private sanitizer: DomSanitizer) {
        this.myForm = formBuilder.group({
            "firstName": [, [Validators.required, Validators.pattern("^[А-Я][а-я]*$")]],
            "secondName": [, [Validators.required, Validators.pattern("^[А-Я][а-я]*$")]],
            "patronymic": [, [Validators.required, Validators.pattern("^[А-Я][а-я]*$")]],
            "birthdate": [, [Validators.required]],
            "phoneNumber": [, [Validators.required]],
            "email": [localStorage.getItem('email'), [Validators.required, Validators.pattern("^([a-z0-9]+([-_][a-z0-9]+)*)@(([a-z0-9]+(-[a-z0-9]+)*)\.)+[a-z]+$")]],
            "eduGroup": [, [Validators.required]],
            "education": formBuilder.array([[, Validators.required]]),
            "eduWorks": [, [Validators.required]],
            "goal": [, [Validators.required]],
            "expWork": [, [Validators.required]],
            "expPractice": [, [Validators.required]],
            "softSkills": [, [Validators.required]],
            "hardSkills": [, [Validators.required]],
            "langKnowledge": [, [Validators.required]]
        });
    }
    ngOnInit() {
        this.httpService.getResume(+localStorage.getItem('id')).subscribe((data: Resume) => this.resume = data);
        this.httpService.getIMG(+localStorage.getItem('id')).subscribe((baseImage: any) => {
            let objectURL = URL.createObjectURL(baseImage);
            this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }
    ngDoCheck() {
        if (this.resume != undefined && this.resume.secondName != undefined && !this.flag) {
            this.flag = true;
            this.myForm.controls['firstName'].setValue(this.resume.firstName);
            this.myForm.controls['secondName'].setValue(this.resume.secondName);
            this.myForm.controls['patronymic'].setValue(this.resume.patronymic);
            this.myForm.controls['birthdate'].setValue(this.resume.birthdate);
            this.myForm.controls['phoneNumber'].setValue(this.resume.phoneNumber);
            this.myForm.controls['email'].setValue(this.resume.email);
            this.myForm.controls['eduGroup'].setValue(this.resume.eduGroup);
            this.getFormsControls()['controls'][0].setValue(this.resume.education[0]);
            if (this.resume.education.length > 1) {
                for (let _i = 0; _i < this.resume.education.length - 1; _i++) {
                    this.addEducation();
                    this.getFormsControls()['controls'][_i + 1].setValue(this.resume.education[_i + 1]);
                }
            }
            this.myForm.controls['eduWorks'].setValue(this.resume.eduWorks);
            this.myForm.controls['goal'].setValue(this.resume.goal);
            this.myForm.controls['expWork'].setValue(this.resume.expWork);
            this.myForm.controls['expPractice'].setValue(this.resume.expPractice);
            this.myForm.controls['softSkills'].setValue(this.resume.softSkills);
            this.myForm.controls['hardSkills'].setValue(this.resume.hardSkills);
            this.myForm.controls['langKnowledge'].setValue(this.resume.langKnowledge);
        }
    }
    getFormsControls(): FormArray {
        return this.myForm.controls['education'] as FormArray;
    }
    addEducation() {
        (<FormArray>this.myForm.controls["education"]).push(new FormControl("", Validators.required));
    }
    resizeTextArea(e) {
        e.target.style.height = "0px";
        e.target.style.height = (e.target.scrollHeight + 14) + "px";
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
            this.myForm.value.imgUrl,
            +localStorage.getItem('id')
        )
        this.httpService.updateResume(this.resume);
        console.log(this.myForm);
    }
    onFileSelected(event) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", localStorage.getItem('id'));
            formData.append("docType", "image");
            const upload$ = this.httpService.uploadIMG(formData);
            upload$.subscribe(() => {
                this.httpService.getIMG(+localStorage.getItem('id')).subscribe((baseImage: any) => {
                    let objectURL = URL.createObjectURL(baseImage);
                    this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                });
            });
        }
    }
}