import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables
} from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ActivityChartComponent } from './widgets/activity-chart/activity-chart.component';
import { FilterPanelComponent } from './widgets/filter-panel/filter-panel.component';
import { KpiCardComponent } from './widgets/kpi-card/kpi-card.component';
import { RecentActivityTableComponent } from './widgets/recent-activity-table/recent-activity-table.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    KpiCardComponent,
    ActivityChartComponent,
    RecentActivityTableComponent,
    FilterPanelComponent
  ],
  imports: [CommonModule, FormsModule, BaseChartDirective, DashboardRoutingModule],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class DashboardModule {}
