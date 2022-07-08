import { Component } from '@angular/core';
import { Resume } from '../resume';
import { HttpService } from '../http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'student-app',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css'],
    providers: [HttpService]
})
export class StudentComponent {
    constructor(private httpService: HttpService, private sanitizer: DomSanitizer) { }
    resume: Resume;
    username: string;
    avatar: any;

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.httpService.getResume(+localStorage.getItem('id')).subscribe((data: Resume) => this.resume = data);
        this.httpService.getIMG(+localStorage.getItem('id')).subscribe((baseImage: any) => {
            let objectURL = URL.createObjectURL(baseImage);
            this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }
}