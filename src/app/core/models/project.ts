export type ProjectUrl = `https://${string}` | `http://${string}`;

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly url?: ProjectUrl;
  readonly tags: readonly string[];
  readonly imageUrl?: ProjectUrl;
  readonly videoUrl?: ProjectUrl;
}

export type ProjectCatalogStatus = 'loading' | 'ready' | 'failed';

export interface ProjectCatalogError {
  readonly code: 'catalog-load-failed';
  readonly message: string;
}

export interface ProjectCatalogState {
  readonly status: ProjectCatalogStatus;
  readonly error: ProjectCatalogError | null;
}
