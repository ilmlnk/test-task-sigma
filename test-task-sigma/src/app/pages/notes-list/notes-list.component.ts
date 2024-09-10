import { Component } from '@angular/core';
import { AppNoteCardComponent } from '../../app-note-card/app-note-card.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AppNoteCardComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {

}
