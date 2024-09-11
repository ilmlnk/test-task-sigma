import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent {
  noteForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      body: [''],
    });
  }

  onSubmit(noteForm: FormGroup) {
    if (noteForm.valid) {
      const note = noteForm.value;
      const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      existingNotes.push(note);

      localStorage.setItem('notes', JSON.stringify(existingNotes));

      console.log('Saved note: ', note);
      this.noteForm.reset();

      this.router.navigate(['/']);
    }
  }

  onCancel() {
    this.noteForm.reset();
    this.router.navigate(['/']);
  }
}
