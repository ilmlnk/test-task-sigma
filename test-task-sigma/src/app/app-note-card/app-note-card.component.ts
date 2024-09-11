import { Component } from '@angular/core';
import { EllipsisDirective } from '../directives/ellipsis-directive.directive';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [EllipsisDirective, CommonModule],
  templateUrl: './app-note-card.component.html',
  styleUrl: './app-note-card.component.scss'
})
export class AppNoteCardComponent {
  @Input() title: string = ''; 
  @Input() body: string = ''; 
}
