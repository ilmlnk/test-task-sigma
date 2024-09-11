import { Component } from '@angular/core';
import { AppNoteCardComponent } from '../../app-note-card/app-note-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AppNoteCardComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  constructor(private router: Router) {}
  onAdd() {
    this.router.navigate(['/new']);
  }
}
