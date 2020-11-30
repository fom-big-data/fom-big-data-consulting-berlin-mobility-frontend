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
  /** Event emitter indicating changes in layer marker visibility */
  @Output() layerMarkerVisibleEventEmitter = new EventEmitter<{layerName: string, visible: boolean}>();

  //
  // Actions
  //

  /**
   * Handles intersection between component and viewport
   * @param target target component
   * @param visible whether the component is visible or not
   */
  public onIntersection({target, visible}: { target: Element; visible: boolean }) {
    this.layerMarkerVisibleEventEmitter.emit({layerName: this.layerName, visible});
  }
}
