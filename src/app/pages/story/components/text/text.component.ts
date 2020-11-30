import {Component, Input} from '@angular/core';

/**
 * Displays a text
 */
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  /** Text */
  @Input() text = '';
  /** Heading */
  @Input() h1 = '';
  /** Sub-heading */
  @Input() h2 = '';
}
