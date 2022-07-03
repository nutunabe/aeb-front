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
    uri = 'http://localhost:8080/controllers/resume/';

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

    private getHeaders() {
        return new HttpHeaders({ Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token') });
    }

    postUser(login: string, email: string, password: string) {
        this.http.post(this.uri + 'signup', { username: login, email: email, password: password })
            .subscribe((response: any) => {
                if (response.message == 'User CREATED') {
                    this.router.navigate(['/']);
                }
            });
    }

    getResumes(): Observable<Resume[]> {
        return this.http.get(this.uri + 'getAll', { headers: this.getHeaders() }).pipe(map((data: any) => {
            let resumesList = data;
            return resumesList.map(function (resume: any): Resume {
                return new Resume(
                    resume.id,
                    resume.firstName,
                    resume.secondName,
                    resume.patronymic,
                    resume.birthdate,
                    resume.phoneNumber,
                    resume.email,
                    resume.education,
                    resume.eduWorks,
                    resume.goal,
                    resume.expWork,
                    resume.expPractice,
                    resume.softSkills,
                    resume.hardSkills,
                    resume.langKnowledge,
                    resume.imgUrl
                )
            })
        }));
    }
}