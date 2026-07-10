import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCardComponent {
  readonly skeletonRows = Array.from({ length: 4 }, (_, index) => index);
  readonly repositoryKpi$ = this.widgetsFacade.repositoryKpi$;
  readonly loadedCommitCount$ = this.widgetsFacade.loadedCommitCount$;
  readonly loading$ = this.widgetsFacade.kpiLoading$;
  readonly error$ = this.widgetsFacade.kpiError$;

  constructor(private readonly widgetsFacade: WidgetsFacade) {}

  refresh(): void {
    this.widgetsFacade.loadRepositoryKpi();
  }
}
