import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { KpiCardComponent } from './widgets/kpi-card/kpi-card.component';

@NgModule({
  declarations: [DashboardPageComponent, KpiCardComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
