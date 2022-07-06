import { Component } from '@angular/core';
import { Resume } from '../resume';
import { HttpService } from '../http.service';

@Component({
    selector: 'student-app',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css'],
    providers: [HttpService]
})
export class StudentComponent {
    constructor(private httpService: HttpService) { }
    resume: Resume;

    ngOnInit() {
        this.httpService.getResume(+localStorage.getItem('id')).subscribe((data: Resume) => this.resume = data);
    }
}