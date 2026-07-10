import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { map } from 'rxjs';

import { WidgetsFacade } from '../../../../store/widgets/widgets.facade';

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityChartComponent {
  readonly skeletonBars = Array.from({ length: 12 }, (_, index) => index);
  readonly emptyChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  readonly loading$ = this.widgetsFacade.activityLoading$;
  readonly error$ = this.widgetsFacade.activityError$;
  readonly chartData$ = this.widgetsFacade.activityPoints$.pipe(
    map(
      (points): ChartConfiguration<'line'>['data'] => ({
        labels: points.map((point) => point.date),
        datasets: [
          {
            label: 'Commits',
            data: points.map((point) => point.commits),
            borderColor: '#8be9c9',
            backgroundColor: 'rgba(139, 233, 201, 0.16)',
            tension: 0.35,
            fill: true,
            pointRadius: 3
          }
        ]
      })
    )
  );

  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          maxRotation: 0
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.12)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
          precision: 0
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.12)'
        }
      }
    }
  };

  constructor(private readonly widgetsFacade: WidgetsFacade) {}

  retry(): void {
    this.widgetsFacade.loadRepositoryActivity();
  }
}
