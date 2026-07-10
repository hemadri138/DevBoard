import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  ActivityPoint,
  GitHubCommitResponse,
  GitHubRepositoryResponse,
  RecentActivityItem,
  RepositoryActivity,
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

  getRepositoryActivity(
    owner: string,
    repo: string,
    since: string,
    until: string
  ): Observable<RepositoryActivity> {
    return this.http
      .get<readonly GitHubCommitResponse[]>(
        `${this.apiBaseUrl}/repos/${owner}/${repo}/commits`,
        {
          params: {
            since,
            until,
            per_page: 100
          }
        }
      )
      .pipe(map((commits) => this.mapActivity(commits)));
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

  private mapActivity(
    commits: readonly GitHubCommitResponse[]
  ): RepositoryActivity {
    const countsByDate = commits.reduce<Record<string, number>>(
      (counts, commit) => {
        const date = this.toDayKey(commit.commit.author?.date ?? '');

        if (!date) {
          return counts;
        }

        return {
          ...counts,
          [date]: (counts[date] ?? 0) + 1
        };
      },
      {}
    );

    const points: readonly ActivityPoint[] = Object.entries(countsByDate)
      .map(([date, count]) => ({
        date,
        commits: count
      }))
      .sort((first, second) => first.date.localeCompare(second.date));

    const recentItems: readonly RecentActivityItem[] = commits
      .slice(0, 30)
      .map((commit) => ({
        id: commit.sha,
        type: 'commit',
        title: commit.commit.message.split('\n')[0] ?? 'Commit',
        author:
          commit.author?.login ?? commit.commit.author?.name ?? 'Unknown author',
        date: commit.commit.author?.date ?? '',
        url: commit.html_url
      }));

    return {
      points,
      recentItems
    };
  }

  private toDayKey(value: string): string | null {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString().slice(0, 10);
  }
}
