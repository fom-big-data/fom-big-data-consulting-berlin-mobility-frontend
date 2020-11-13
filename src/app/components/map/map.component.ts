import {Component, Input, OnInit} from '@angular/core';

declare var ol: any;

/**
 * Displays an Open Street Map
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  BRANDENBURG_GATE = [13.391863036824988, 52.516479305942624];

  @Input() startingPosition = this.BRANDENBURG_GATE;

  map: any;

  //
  // Lifecycle hooks
  //

  /**
   * Lifecycle phase
   */
  ngOnInit() {
    this.map = this.initializeMap();

    this.map.on('click', (args) => {
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      const lon = lonlat[0];
      const lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
    });
  }

  private initializeMap() {
    return new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat(this.startingPosition),
        zoom: 10
      })
    });
  }

  setCenter() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat(this.startingPosition));
    view.setZoom(8);
  }
}
