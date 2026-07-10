import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-recent-activity-table',
  templateUrl: './recent-activity-table.component.html',
  styleUrl: './recent-activity-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityTableComponent {
  readonly recentItems$ = this.widgetsFacade.recentItems$;
  readonly loading$ = this.widgetsFacade.activityLoading$;
  readonly error$ = this.widgetsFacade.activityError$;

  constructor(private readonly widgetsFacade: WidgetsFacade) {}
}
