import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {HexagonMapComponent} from './hexagon-map/hexagon-map.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
  ],
  declarations: [MapComponent, HexagonMapComponent],
  entryComponents: [MapComponent, HexagonMapComponent],
  exports: [MapComponent, HexagonMapComponent]
})
export class MapModule {
}
