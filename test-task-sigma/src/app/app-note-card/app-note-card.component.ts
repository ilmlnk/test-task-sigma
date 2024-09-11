import { Component } from '@angular/core';
import { EllipsisDirective } from '../directives/ellipsis-directive.directive';
import { Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import EventEmitter from 'events';
import { Note } from '../shared/note.model';
import { Router } from '@angular/router';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [EllipsisDirective, CommonModule],
  templateUrl: './app-note-card.component.html',
  styleUrl: './app-note-card.component.scss'
})
export class AppNoteCardComponent {
  notes: Note[] = [];

  @Input() title: string = ''; 
  @Input() body: string = ''; 
  @Input() noteId: number = 0;

  constructor(private router: Router, private notesService: NotesService) { }

  onDelete(noteId: number) {
    this.notesService.delete(noteId); 
    this.notes = this.notesService.getAll();
  }
}
