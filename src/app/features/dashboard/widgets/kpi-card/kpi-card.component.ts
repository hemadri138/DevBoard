import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCardComponent implements OnInit {
  readonly repositoryKpi$ = this.widgetsFacade.repositoryKpi$;
  readonly loading$ = this.widgetsFacade.loading$;
  readonly error$ = this.widgetsFacade.error$;

  constructor(private readonly widgetsFacade: WidgetsFacade) {}

  ngOnInit(): void {
    this.widgetsFacade.loadRepositoryKpi();
  }

  refresh(): void {
    this.widgetsFacade.loadRepositoryKpi();
  }
}
