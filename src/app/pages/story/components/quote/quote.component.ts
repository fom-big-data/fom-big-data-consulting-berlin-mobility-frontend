import {Component, Input} from '@angular/core';

/**
 * Displays a quote
 */
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {

  /** Quote title */
  @Input() title = '';
  /** Quote text lines */
  @Input() textLines = [];
  /** Quote author */
  @Input() author = '';
}
