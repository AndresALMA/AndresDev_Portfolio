import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Project, ProjectCatalogState } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectCatalog {
  private readonly http = inject(HttpClient);
  private readonly loadedProjects = signal<readonly Project[]>([]);
  private readonly catalogState = signal<ProjectCatalogState>({ status: 'loading', error: null });

  readonly projects = this.loadedProjects.asReadonly();
  readonly status = computed(() => this.catalogState().status);
  readonly error = computed(() => this.catalogState().error);

  setProjects(projects: readonly Project[]): void {
    this.loadedProjects.set(projects);
    this.catalogState.set({ status: 'ready', error: null });
  }

  load(): Observable<readonly Project[]> {
    this.catalogState.set({ status: 'loading', error: null });

    return this.http.get<readonly Project[]>('projects.json').pipe(
      tap((projects) => this.setProjects(projects)),
      catchError(() => {
        this.catalogState.set({
          status: 'failed',
          error: { code: 'catalog-load-failed', message: 'Projects could not be loaded.' },
        });
        return of<readonly Project[]>([]);
      }),
    );
  }
}
