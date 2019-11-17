import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectsService } from '../services/projects.service';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  faPlay = faPlay;
  faStop = faStop;

  constructor( private projectService: ProjectsService) { 
    this.projectService
      .getProjects()
      .subscribe(
        data => this.projects = data,
        error => console.log(error));
  }

  ngOnInit() {
  }

  onLogClicked(project: Project) {
    if(project.active){}
      // project.active = !project.active;
  }

  isAnyProjectActive() {
    return this.projects.some(x => x.active);
  }

}
