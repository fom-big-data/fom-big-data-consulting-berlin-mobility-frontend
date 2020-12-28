import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Chart} from 'chart.js';

/**
 * Displays speed graph
 */
@Component({
  selector: 'app-speed-graph',
  templateUrl: './speed-graph.component.html',
  styleUrls: ['./speed-graph.component.scss']
})
export class SpeedGraphComponent implements OnInit {

  /** Speed time title */
  @Input() speedTimeTitle = '';
  /** Weekday color */
  @Input() weekdayColor = 'black';
  /** Weekend color */
  @Input() weekendColor = 'grey';
  /** Weekday label */
  @Input() labelWeekday = 'Wochentag';
  /** Weekend label */
  @Input() labelWeekend = 'Wochenende';

  /** Speed time chart */
  speedTimeChart: any;
  /** Weekday data */
  dataWeekday = new Array(24);
  /** Weekend data */
  dataWeekend = new Array(24);

  /**
   * Constructor
   * @param http http client
   */
  constructor(private http: HttpClient) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    const baseUrl = environment.github.resultsUrl;

    const labels = [];
    for (let i = 0; i < 24; i++) {
      labels[i] = i + ' Uhr';
    }

    this.http.get(baseUrl + 'weekend_avg_speed.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {
      data = JSON.parse(data);

      const keys = Object.keys(data);

      // tslint:disable-next-line:forin
      for (const i in keys) {
        this.dataWeekend[i] = {x: i, y: data[keys[i]]};
      }
    });

    this.http.get(baseUrl + 'weekday_avg_speed.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {
      data = JSON.parse(data);

      const keys = Object.keys(data);

      // tslint:disable-next-line:forin
      for (const i in keys) {
        this.dataWeekday[i] = {x: i, y: data[keys[i]]};
      }

      this.speedTimeChart = new Chart('speedTimeChart', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: this.dataWeekday,
            fill: false,
            borderColor: this.weekdayColor
          }
          ],
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  //
  // Actions
  //

  /**
   * Handles slide toggle change event
   * @param event event
   */
  onSlideToggleChanged(event: MatSlideToggleChange) {
    if (event.checked) {
      this.speedTimeChart.data.datasets[0].data = this.dataWeekend;
      this.speedTimeChart.data.datasets[0].borderColor = this.weekendColor;
    } else {
      this.speedTimeChart.data.datasets[0].data = this.dataWeekday;
      this.speedTimeChart.data.datasets[0].borderColor = this.weekdayColor;
    }
    this.speedTimeChart.update();
  }
}
