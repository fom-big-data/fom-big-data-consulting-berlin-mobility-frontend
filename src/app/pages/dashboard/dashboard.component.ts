import {OnInit, Component, ElementRef, Input, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';
import { Chart } from 'chart.js';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ThemePalette} from '@angular/material/core';

/**
 * Displays a dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
    toggle_color: ThemePalette = 'primary';
    chart: any;
    weekday_color = "#3cba9f"
    weekday_data = [{
              x: 0,
              y: 30
            }, {
              x: 1,
              y: 31
            }, {
              x: 2,
              y: 27
            }, {
              x: 3,
              y: 31
            }, {
              x: 4,
              y: 35
            }]

    weekend_color = "#ba3c9f"
    weekend_data = [{
            x: 0,
            y: 17
          }, {
            x: 1,
            y: 28
          }, {
            x: 2,
            y: 24
          }, {
            x: 3,
            y: 20
          }, {
            x: 4,
            y: 31
          }]
    /** Toolbar component */
    @ViewChild(MatToolbar, {read: ElementRef}) toolbar: ElementRef;

    //ngAfterViewInit() {}

    onChange($event: MatSlideToggleChange) {
    console.log($event);
    console.log(this.chart.data);

    if($event.checked){
      this.chart.data.datasets[0].data = this.weekend_data
      this.chart.data.datasets[0].borderColor = this.weekend_color
    }else{
        this.chart.data.datasets[0].data = this.weekday_data
        this.chart.data.datasets[0].borderColor = this.weekday_color
    }
    this.chart.update()


}

    ngOnInit(){
      this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: ['0 Uhr','1 Uhr','2 Uhr','3 Uhr','4 Uhr'],
            datasets: [{
              data: this.weekday_data,
              fill: false,
              borderColor: this.weekday_color
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
        console.log(this.chart);
    };
  }
