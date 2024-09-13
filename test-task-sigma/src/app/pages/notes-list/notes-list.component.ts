import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppNoteCardComponent } from '../../app-note-card/app-note-card.component';
import { Router } from '@angular/router';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { CommonModule } from '@angular/common';
import { transition, trigger, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AppNoteCardComponent, CommonModule, FormsModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  animations: [
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  searchQuery: string = '';

  constructor(
    private router: Router,
    private notesService: NotesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.notes = this.notesService.getAll();
    console.log(this.notes);
  }
  onAdd() {
    this.router.navigate(['/new']);
  }

  onDelete(noteId: number) {
    this.notesService.delete(noteId);
    this.cdr.detectChanges();
    this.notes = this.notesService.getAll();
  }

  get filteredNotes() {
    return this.notes.filter(note =>
      note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  highlightText(text: string, searchQuery: string) {
    if (!searchQuery) {
      return text;
    }

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
