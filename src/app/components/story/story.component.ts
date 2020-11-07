import {Component, Input, OnInit} from '@angular/core';

declare var ol: any;

/**
 * Displays an Open Street Story
 */
@Component({
  selector: 'data-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})

export class StoryComponent implements OnInit {
 ngOnInit() {
  }

  private initializeStory() {
  }

}
