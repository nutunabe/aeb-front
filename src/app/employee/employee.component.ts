import { Component, Output } from "@angular/core";
import { Resume } from '../resume';
import { HttpService } from '../http.service';
 
@Component({
    selector: 'employee-app',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css'],
    providers: [HttpService]
})

export class EmployeeComponent{

    constructor(private httpService: HttpService) { }
    resumes: Resume[];

    ngOnInit(){
        this.httpService.getResumes().subscribe((data: Resume[]) => this.resumes = data);
    }
}