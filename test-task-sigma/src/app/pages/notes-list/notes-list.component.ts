import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppNoteCardComponent } from '../../app-note-card/app-note-card.component';
import { Router } from '@angular/router';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AppNoteCardComponent, CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();

  constructor(
    private router: Router, 
    private notesService: NotesService,
    private cdr: ChangeDetectorRef
  ) {}

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
}
