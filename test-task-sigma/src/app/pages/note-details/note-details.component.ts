import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent implements OnInit {
  note: Note | undefined;
  noteForm: FormGroup;
  noteId: number | null = null;
  new: boolean;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      body: ['']
    });

    this.route.params.subscribe(params => {
      this.noteId = +params['id'];
      if (this.noteId) {
        const note = this.notesService.get(this.noteId);
        if (note) {
          this.noteForm.setValue({
            title: note.title,
            body: note.body
          });
        }
      }
    });
  }

  onSubmit() {
    const formValue = this.noteForm.value;
    if (this.noteId) {
      this.notesService.update(this.noteId, formValue.title, formValue.body);
    } else {
      const newNote: Note = {
        id: 0, 
        title: formValue.title,
        body: formValue.body
      };
      this.notesService.add(newNote);
    }
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
