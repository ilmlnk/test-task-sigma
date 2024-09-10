import { Component } from '@angular/core';
import { EllipsisDirective } from '../directives/ellipsis-directive.directive';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [EllipsisDirective],
  templateUrl: './app-note-card.component.html',
  styleUrl: './app-note-card.component.scss'
})
export class AppNoteCardComponent {

}
