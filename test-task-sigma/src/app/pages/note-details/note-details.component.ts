import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent {
  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required)
  });

  constructor(private router: Router) {}

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
