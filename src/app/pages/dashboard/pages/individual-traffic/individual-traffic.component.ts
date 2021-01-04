import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Chart} from 'chart.js';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ThemePalette} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {BoundingBox} from '../../../../ui/map/model/bounding-box.model';

@Component({
  selector: 'app-individual-traffic',
  templateUrl: './individual-traffic.component.html',
  styleUrls: ['./individual-traffic.component.scss']
})
export class IndividualTrafficComponent implements OnInit {

  boundingBoxEnum = BoundingBox;

  mapBoxStyleEnum = MapBoxStyle;

  toggle_color: ThemePalette = 'primary';
  speedTimeChart: any;
  weekday_color = '#3cba9f';
  weekday_data = new Array(24);

  weekend_color = '#ba3c9f';
  weekend_data = new Array(24);
  /** Toolbar component */
  @ViewChild(MatToolbar, {read: ElementRef}) toolbar: ElementRef;

  // ngAfterViewInit() {}


  /**
   * Constructor
   * @param http http client
   */
  constructor(private http: HttpClient) {
  }

  onChange($event: MatSlideToggleChange) {
    console.log($event);
    console.log(this.speedTimeChart.data);

    if ($event.checked) {
      this.speedTimeChart.data.datasets[0].data = this.weekend_data;
      this.speedTimeChart.data.datasets[0].borderColor = this.weekend_color;
    } else {
      this.speedTimeChart.data.datasets[0].data = this.weekday_data;
      this.speedTimeChart.data.datasets[0].borderColor = this.weekday_color;
    }
    this.speedTimeChart.update();


  }

  ngOnInit() {

    const baseUrl = environment.github.resultsUrl;

    const labels = [];
    for (let i = 0; i < 24; i++) {
      labels[i] = i + ' Uhr';
    }

    this.http.get(baseUrl + 'weekend_avg_speed.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {
      data = JSON.parse(data);

      const keys = Object.keys(data);

      for (const i in keys) {
        this.weekend_data[i] = {x: i, y: data[keys[i]]};
      }
    });

    this.http.get(baseUrl + 'weekday_avg_speed.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {
      data = JSON.parse(data);

      const keys = Object.keys(data);

      for (const i in keys) {
        this.weekday_data[i] = {x: i, y: data[keys[i]]};
      }


      this.speedTimeChart = new Chart('speedTimeChart', {
        type: 'line',
        data: {
          labels,
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

    });
  }
}
