import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Resume } from './resume';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
    auth = 'http://localhost:8080/api/auth/';
    api = 'http://localhost:8080/controllers/';

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

    private getHeaders() {
        return new HttpHeaders({ Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token') });
    }

    postUser(login: string, email: string, password: string) {
        this.http.post(this.auth + 'signup', { username: login, email: email, password: password })
            .subscribe((response: any) => {
                if (response.message == 'User CREATED') {
                    this.router.navigate(['/']);
                }
            });
    }

    postResume(resume: Resume) {
        this.http.post(this.api + 'resume/add', {
            firstName: resume.firstName,
            secondName: resume.secondName,
            patronymic: resume.patronymic,
            birthdate: resume.birthdate,
            phoneNumber: resume.phoneNumber,
            email: resume.email,
            eduGroup: resume.eduGroup,
            education: resume.education,
            eduWorks: resume.eduWorks,
            goal: resume.goal,
            expWork: resume.expWork,
            expPractice: resume.expPractice,
            softSkills: resume.softSkills,
            hardSkills: resume.hardSkills,
            langKnowledge: resume.langKnowledge,
            imgUrl: resume.imgUrl
        }, { headers: this.getHeaders() }).subscribe((response: any) => {
            console.log(response);
        });
    }

    getResumes(): Observable<Resume[]> {
        return this.http.get(this.api + 'resume/getAll', { headers: this.getHeaders() }).pipe(map((data: any) => {
            let resumesList = data;
            return resumesList.map(function (resume: any): Resume {
                return new Resume(
                    resume.firstName,
                    resume.secondName,
                    resume.patronymic,
                    resume.birthdate,
                    resume.phoneNumber,
                    resume.email,
                    resume.eduGroup,
                    resume.education,
                    resume.eduWorks,
                    resume.goal,
                    resume.expWork,
                    resume.expPractice,
                    resume.softSkills,
                    resume.hardSkills,
                    resume.langKnowledge,
                    resume.imgUrl,
                    resume.id
                )
            })
        }));
    }
}