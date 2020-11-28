import {Component, Input, QueryList} from '@angular/core';
import {SectionHeaderComponent} from '../section-header/section-header.component';

/**
 * Displays page footer
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  /** List of section header components */
  @Input() sectionHeaders: QueryList<SectionHeaderComponent>;
}
