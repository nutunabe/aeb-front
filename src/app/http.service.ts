import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Resume } from './resume';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { removeSummaryDuplicates } from '@angular/compiler';

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

    updateResume(resume: Resume) {
        this.http.put(this.api + 'resume/update', {
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
            id: resume.id,
            resumeStatus: resume.status
        }, { headers: this.getHeaders() }).subscribe((response: any) => {
            console.log(response);
        });
    }

    getResume(id: number): Observable<Resume> {
        return this.http.get(this.api + 'resume/get/' + id, { headers: this.getHeaders() })
            .pipe(
                map((resume: any) => {
                    const [year, month, day] = resume.birthdate.split('-');
                    const birthdate = [day, month, year].join('.');
                    return new Resume(
                        resume.firstName,
                        resume.secondName,
                        resume.patronymic,
                        birthdate,
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
                        resume.id,
                        resume.resumeStatus
                    )
                }));
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
                    resume.id,
                    resume.resumeStatus
                )
            })
        }));
    }

    uploadIMG(formData: FormData) {
        return this.http.post("http://localhost:8080/api/upload", formData, { headers: this.getHeaders(), responseType: 'blob' });
    }

    getIMG(id: number) {
        return this.http.get("http://localhost:8080/api/download?userId=" + id + "&docType=image", { headers: this.getHeaders(), responseType: 'blob' });
    }
}