import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Displays header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /** App title */
  appTitle = environment.appTitle;
  /** App sub-title */
  appSubTitle = environment.appSubTitle;
}
