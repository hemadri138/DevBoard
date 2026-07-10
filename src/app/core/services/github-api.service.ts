import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  GitHubRepositoryResponse,
  RepositoryKpi
} from '../models/github-repository.model';

@Injectable({ providedIn: 'root' })
export class GitHubApiService {
  private readonly apiBaseUrl = 'https://api.github.com';

  constructor(private readonly http: HttpClient) {}

  getRepositoryKpi(owner: string, repo: string): Observable<RepositoryKpi> {
    return this.http
      .get<GitHubRepositoryResponse>(
        `${this.apiBaseUrl}/repos/${owner}/${repo}`
      )
      .pipe(map((response) => this.mapRepository(response)));
  }

  private mapRepository(response: GitHubRepositoryResponse): RepositoryKpi {
    return {
      repositoryId: response.id,
      fullName: response.full_name,
      url: response.html_url,
      description: response.description ?? 'No repository description provided.',
      stars: response.stargazers_count,
      forks: response.forks_count,
      openIssues: response.open_issues_count,
      watchers: response.watchers_count,
      pushedAt: response.pushed_at,
      updatedAt: response.updated_at
    };
  }
}
