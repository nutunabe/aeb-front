import { NgModule } from '@angular/core';
import { AebUiKitModule } from 'aeb-ui-kit';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ResumeComponent } from './resume/resume.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { StudentComponent } from './student/student.component';
import { TraineeComponent } from './trainee/trainee.component';
import { FaqComponent } from './faq/faq.component';
import { EmployeeComponent } from './employee/employee.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TraineeResumeComponent } from './traineeresume/traineeresume.component';
 
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'resume', component: ResumeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'student', component: StudentComponent },
    { path: 'trainee', component: TraineeComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'emp', component: EmployeeComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'trresume/:id', component: TraineeResumeComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, AebUiKitModule, 
        RouterModule.forRoot(appRoutes), 
        NgxMaskModule.forRoot(), 
        HttpClientModule, ReactiveFormsModule],
    declarations: [AppComponent, MainComponent, 
        ResumeComponent, SignInComponent, 
        SignUpComponent, StudentComponent, 
        TraineeComponent, FaqComponent, 
        EmployeeComponent,ScheduleComponent,
        TraineeResumeComponent],
    bootstrap: [AppComponent],
    providers: [CookieService]
})
export class AppModule { }