import {Component, Input, OnInit} from '@angular/core';

/**
 * Displays an Open Street Text
 */
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class TextComponent implements OnInit {
  @Input() text = '';
  @Input() h1 = '';
  @Input() h2 = '';

  ngOnInit() {
  }

  private initializeText() {
  }

}
