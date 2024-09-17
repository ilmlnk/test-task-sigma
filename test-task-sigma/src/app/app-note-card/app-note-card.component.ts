import { Component } from '@angular/core';
import { EllipsisDirective } from '../directives/ellipsis.directive';
import { Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Note } from '../shared/note.model';
import { Router } from '@angular/router';
import { NotesService } from '../shared/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [EllipsisDirective, CommonModule, FormsModule],
  templateUrl: './app-note-card.component.html',
  styleUrl: './app-note-card.component.scss'
})
export class AppNoteCardComponent {
  notes: Note[] = new Array<Note>();

  @Input() title: string = '';
  @Input() body: string = '';
  @Input() noteId: number = 0;

  @Output() update = new EventEmitter<{ id: number, title: string, body: string }>();
  @Output() delete = new EventEmitter<number>();

  isEditing: boolean = false;
  editTitle: string = '';
  editBody: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Note ID', this.noteId);
  }


  onEdit(noteId: number) {
    if (noteId) {
      this.router.navigate(['', noteId]);
    } else {
      console.error('Invalid note ID: ' + noteId);
    }
  }

  onDelete(noteId: number) {
    if (noteId) {
      this.delete.emit(noteId);
    } else {
      console.error('Invalid note ID: ' + noteId);
    }
  }
}
