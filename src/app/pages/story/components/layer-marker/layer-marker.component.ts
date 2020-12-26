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

  /** Layers names */
  @Input() layers: string[];
  /** Opacity */
  @Input() opacity = 100;
  /** Whether or not other layers should be made transparent */
  @Input() clearOthers = true;
  /** Whether or not an event should be emitted when marker is not visible anymore */
  @Input() emitOnLeave = false;
  /** Event emitter indicating changes in layer marker visibility */
  @Output() layerMarkerVisibleEventEmitter = new EventEmitter<{ layer: string, opacity: number, clearOthers: boolean }>();

  //
  // Actions
  //

  /**
   * Handles intersection between component and viewport
   * @param target target component
   * @param visible whether the component is visible or not
   */
  public onIntersection({target, visible}: { target: Element; visible: boolean }) {
    this.layers.forEach(layer => {
      if (visible) {
        this.layerMarkerVisibleEventEmitter.emit({layer, opacity: this.opacity, clearOthers: this.clearOthers});
      } else if (this.emitOnLeave) {
        this.layerMarkerVisibleEventEmitter.emit({layer, opacity: 0, clearOthers: this.clearOthers});
      }
    });
  }
}
