import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Project, ProjectCatalogState } from '../models/project';

class CatalogValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CatalogValidationError';
  }
}

function validateCatalog(payload: unknown): readonly Project[] {
  if (!Array.isArray(payload)) {
    throw new CatalogValidationError('Project catalog payload must be an array.');
  }

  payload.forEach((item: unknown, index: number) => {
    if (!item || typeof item !== 'object') {
      throw new CatalogValidationError(`Project at index ${index} is not an object.`);
    }

    const candidate = item as Record<string, unknown>;
    for (const field of ['id', 'title', 'description', 'evidence'] as const) {
      const value = candidate[field];
      if (typeof value !== 'string' || value.trim() === '') {
        throw new CatalogValidationError(`Project at index ${index} has an invalid ${field}.`);
      }
    }
    for (const field of ['tech', 'pending'] as const) {
      if (!Array.isArray(candidate[field])) {
        throw new CatalogValidationError(`Project at index ${index} has an invalid ${field}.`);
      }
    }
  });

  return payload as readonly Project[];
}

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

    return this.http.get<unknown>('projects.json').pipe(
      map((payload) => validateCatalog(payload)),
      tap((projects) => this.setProjects(projects)),
      catchError((error: unknown) => {
        const invalid = error instanceof CatalogValidationError;
        this.catalogState.set({
          status: 'failed',
          error: invalid
            ? { code: 'catalog-invalid', message: (error as Error).message }
            : { code: 'catalog-load-failed', message: 'Projects could not be loaded.' },
        });
        return of<readonly Project[]>([]);
      }),
    );
  }
}
