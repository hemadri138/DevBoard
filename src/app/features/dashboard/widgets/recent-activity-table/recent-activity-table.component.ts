import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RecentActivityItem } from '../../../../core/models/github-repository.model';
import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-recent-activity-table',
  templateUrl: './recent-activity-table.component.html',
  styleUrl: './recent-activity-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityTableComponent {
  readonly skeletonRows = Array.from({ length: 24 }, (_, index) => index);
  readonly recentItems$ = this.widgetsFacade.recentItems$;
  readonly loadedCommitCount$ = this.widgetsFacade.loadedCommitCount$;
  readonly loading$ = this.widgetsFacade.activityLoading$;
  readonly error$ = this.widgetsFacade.activityError$;

  constructor(private readonly widgetsFacade: WidgetsFacade) {}

  retry(): void {
    this.widgetsFacade.loadRepositoryActivity();
  }

  trackById(_: number, item: RecentActivityItem): string {
    return item.id;
  }
}
