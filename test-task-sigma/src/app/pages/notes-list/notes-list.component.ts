import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppNoteCardComponent } from '../../app-note-card/app-note-card.component';
import { Router } from '@angular/router';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { CommonModule } from '@angular/common';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AppNoteCardComponent, CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  animations: [
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

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

  filter(query: string) {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);
    terms.forEach(term => {
      let results = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    });
    let uniqueResults = this.removeDuplicates(allResults);

  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach((e) => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string) : Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })

    return relevantNotes;
  }
}
