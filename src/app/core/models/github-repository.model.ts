export interface GitHubRepositoryResponse {
  readonly id: number;
  readonly full_name: string;
  readonly html_url: string;
  readonly description: string | null;
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly open_issues_count: number;
  readonly watchers_count: number;
  readonly pushed_at: string;
  readonly updated_at: string;
}

export interface RepositoryKpi {
  readonly repositoryId: number;
  readonly fullName: string;
  readonly url: string;
  readonly description: string;
  readonly stars: number;
  readonly forks: number;
  readonly openIssues: number;
  readonly watchers: number;
  readonly pushedAt: string;
  readonly updatedAt: string;
}
