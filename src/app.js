import { notesData } from "./data/notes.js";
import { loadNotes, saveNotes } from "./storage/notes-storage.js";
import "./components/app-bar.js";
import "./components/empty-state.js";
import "./components/note-form.js";
import "./components/note-item.js";
import "./components/note-list.js";

let notes = loadNotes(notesData);
const noteList = document.querySelector("note-list");

function renderNotes() {
  noteList.notes = notes;
}

function addNote({ title, body }) {
  notes = [
    {
      id: `notes-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    },
    ...notes,
  ];

  saveNotes(notes);
  renderNotes();
}

saveNotes(notes);
document.addEventListener("note:add", (event) => addNote(event.detail));
renderNotes();
