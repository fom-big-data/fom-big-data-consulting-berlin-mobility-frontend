import {Component, Input} from '@angular/core';

/**
 * Displays a section header
 */
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {

  /** ID */
  @Input() id = '';
  /** Title */
  @Input() title = '';
}
