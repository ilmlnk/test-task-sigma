import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = new Array<Note>();
  private nextId: number = 1;

  constructor() { }

  getAll() {
    return this.notes;
  }

  get(id: number) {
    return this.notes.find(note => note.id === id);
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  add(note: Note) {
    note.id = this.nextId++;
    this.notes.push(note);
    return note.id;
  }

  update(id: number, title: string, body: string) {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.title = title;
      note.body = body;
    }
  }

  delete(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
