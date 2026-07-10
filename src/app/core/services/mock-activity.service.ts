import { Injectable } from '@angular/core';

import { RecentActivityItem } from '../models/github-repository.model';
import { DateRange } from '../../store/filters/filters.reducer';

@Injectable({ providedIn: 'root' })
export class MockActivityService {
  private readonly authors = [
    'a11y-reviewer',
    'build-sheriff',
    'core-maintainer',
    'release-captain',
    'performance-lead',
    'docs-engineer'
  ];

  private readonly titles = [
    'Tune incremental compiler diagnostics',
    'Refine hydration boundary scheduling',
    'Add signal-based cleanup for dashboard streams',
    'Improve router preloading heuristics',
    'Normalize analytics event payloads',
    'Reduce flaky retry noise in integration checks'
  ];

  expandRecentItems(
    seedItems: readonly RecentActivityItem[],
    dateRange: DateRange,
    minimumRows = 5000
  ): readonly RecentActivityItem[] {
    if (seedItems.length >= minimumRows) {
      return seedItems;
    }

    const rowsToCreate = minimumRows - seedItems.length;
    const generatedItems = Array.from({ length: rowsToCreate }, (_, index) =>
      this.createMockItem(index, dateRange)
    );

    return [...seedItems, ...generatedItems].sort((first, second) =>
      second.date.localeCompare(first.date)
    );
  }

  private createMockItem(
    index: number,
    dateRange: DateRange
  ): RecentActivityItem {
    const since = new Date(dateRange.since).getTime();
    const until = new Date(dateRange.until).getTime();
    const span = Math.max(until - since, 1);
    const date = new Date(until - ((index * 9973) % span));
    const type: RecentActivityItem['type'] =
      index % 5 === 0 ? 'pull-request' : 'commit';

    return {
      id: `mock-${dateRange.preset}-${index}`,
      type,
      title: this.titles[index % this.titles.length],
      author: this.authors[index % this.authors.length],
      date: date.toISOString(),
      url: this.createMockUrl(type, index, dateRange.preset)
    };
  }

  private createMockUrl(
    type: RecentActivityItem['type'],
    index: number,
    preset: DateRange['preset']
  ): string {
    if (type === 'pull-request') {
      return `https://github.com/angular/angular/pull/${10_000 + index}`;
    }

    return `https://github.com/angular/angular/commit/${this.createMockSha(
      index,
      preset
    )}`;
  }

  private createMockSha(index: number, preset: DateRange['preset']): string {
    const seed = `${preset}${index.toString(16).padStart(8, '0')}`;

    return seed.repeat(Math.ceil(40 / seed.length)).slice(0, 40);
  }
}
