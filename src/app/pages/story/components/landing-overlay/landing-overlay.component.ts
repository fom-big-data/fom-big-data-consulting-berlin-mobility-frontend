import {Component} from '@angular/core';
import {Router} from '@angular/router';

/**
 * Displays header overlay
 */
@Component({
  selector: 'app-landing-overlay',
  templateUrl: './landing-overlay.component.html',
  styleUrls: ['./landing-overlay.component.scss']
})
export class LandingOverlayComponent {

  /**
   * Constructor
   * @param router router
   */
  constructor(private router: Router) {
  }

  /**
   * Handles click on card
   * @param route route
   */
  onCardClicked(route: string) {
    this.router.navigate([route]);
  }
}
