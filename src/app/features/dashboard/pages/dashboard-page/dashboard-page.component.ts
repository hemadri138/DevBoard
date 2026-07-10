import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PreferencesFacade } from '../../../../store/preferences/preferences.facade';
import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  readonly theme$ = this.preferencesFacade.theme$;
  readonly themeToggleLabel$ = this.preferencesFacade.themeToggleLabel$;

  constructor(
    private readonly preferencesFacade: PreferencesFacade,
    private readonly widgetsFacade: WidgetsFacade
  ) {}

  ngOnInit(): void {
    this.widgetsFacade.loadDashboardData();
  }

  toggleTheme(): void {
    this.preferencesFacade.toggleTheme();
  }
}
