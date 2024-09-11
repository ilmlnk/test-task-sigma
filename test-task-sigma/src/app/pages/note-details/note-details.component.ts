import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  noteForm: FormGroup;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: ['', Validators.required], 
      body: ['']
    });
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const newNote: Note = {
        id: this.notesService.getId(this.note),
        title: this.noteForm.get('title')?.value,
        body: this.noteForm.get('body')?.value
      };

      this.notesService.add(newNote);
      this.router.navigate(['/']);
    }
  }

    onCancel() {
      this.router.navigate(['/']);
    }
  }
