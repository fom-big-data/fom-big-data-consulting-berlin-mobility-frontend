import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {ThemePalette} from '@angular/material/core';
import {environment} from '../../../../../environments/environment';
import {BoundingBox} from '../../../../ui/map/model/bounding-box.model';


@Component({
  selector: 'app-public-transport',
  templateUrl: './public-transport.component.html',
  styleUrls: ['./public-transport.component.scss']
})
export class PublicTransportComponent implements OnInit {

    boundingBoxEnum = BoundingBox;

    mapBoxStyleEnum = MapBoxStyle;

  constructor() { }

  ngOnInit(): void {
  }

}
