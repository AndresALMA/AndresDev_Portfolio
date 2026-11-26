import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProjectCatalog } from '../../core/services/project-catalog';
import { ProjectCard } from '../../shared/components/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private readonly catalog = inject(ProjectCatalog);
  private readonly destroyRef = inject(DestroyRef);

  readonly projects = this.catalog.projects;
  readonly status = this.catalog.status;
  readonly error = this.catalog.error;

  ngOnInit(): void {
    this.catalog.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
