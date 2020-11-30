import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Represents an invisible layer marker
 */
@Component({
  selector: 'app-layer-marker',
  templateUrl: './layer-marker.component.html',
  styleUrls: ['./layer-marker.component.scss']
})
export class LayerMarkerComponent {

  /** Layer name */
  @Input() layerName: string;
  /** Layer transparency */
  @Input() transparency = 100;
  /** Event emitter indicating changes in layer marker visibility */
  @Output() layerMarkerVisibleEventEmitter = new EventEmitter<{ layerName: string, transparency: number }>();

  //
  // Actions
  //

  /**
   * Handles intersection between component and viewport
   * @param target target component
   * @param visible whether the component is visible or not
   */
  public onIntersection({target, visible}: { target: Element; visible: boolean }) {
    if (visible) {
      this.layerMarkerVisibleEventEmitter.emit({layerName: this.layerName, transparency: this.transparency});
    } else {
      this.layerMarkerVisibleEventEmitter.emit({layerName: this.layerName, transparency: 0});
    }
  }
}
