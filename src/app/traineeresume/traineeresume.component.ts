import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../http.service";
import { Resume } from "../resume";

@Component({
    selector: 'traineeresume-app',
    templateUrl: './traineeresume.component.html',
    styleUrls: ['./traineeresume.component.css']
})

export class TraineeResumeComponent {

    constructor(private httpService: HttpService, 
        private route: ActivatedRoute) { }

    resume: Resume;

    id = 0;

    ngOnInit() {
        this.route.params.subscribe(event => {
            this.id = event.id;
        })
        this.httpService.getResume(+this.id).subscribe((data: Resume) => this.resume = data);
    }
}