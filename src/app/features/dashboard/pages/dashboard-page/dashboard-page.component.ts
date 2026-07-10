import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  constructor(private readonly widgetsFacade: WidgetsFacade) {}

  ngOnInit(): void {
    this.widgetsFacade.loadDashboardData();
  }
}
