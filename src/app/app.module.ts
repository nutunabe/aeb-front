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

import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'resume', component: ResumeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'student', component: StudentComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, AebUiKitModule, RouterModule.forRoot(appRoutes), NgxMaskModule.forRoot(), HttpClientModule, ReactiveFormsModule],
    declarations: [AppComponent, MainComponent, ResumeComponent, SignInComponent, SignUpComponent, StudentComponent],
    bootstrap: [AppComponent],
    providers: [CookieService]
})
export class AppModule { }