import { Component, input } from '@angular/core';

import { skillAbbreviation, skillById } from '../../../core/data/skills';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly skillById = skillById;
  readonly skillAbbreviation = skillAbbreviation;
}
