import {AfterViewInit, Component, ElementRef, Input, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MapBoxStyle} from '../../core/mapbox/model/map-box-style.enum';


/**
 * Displays a dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements AfterViewInit {

    /** Toolbar component */
    @ViewChild(MatToolbar, {read: ElementRef}) toolbar: ElementRef;

    ngAfterViewInit() {}
  }
