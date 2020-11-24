import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
  ],
  declarations: [MapComponent],
  entryComponents: [MapComponent],
  exports: [MapComponent]
})
export class MapModule {
}
