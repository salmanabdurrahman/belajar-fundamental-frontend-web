import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/main.css";
import { NotesApi } from "./api/notes-api.js";
import "./components/app-bar.js";
import "./components/empty-state.js";
import "./components/loading-indicator.js";
import "./components/note-form.js";
import "./components/note-item.js";
import "./components/note-list.js";
import "./components/toast-message.js";

const activeList = document.querySelector("#active-notes");
const archivedList = document.querySelector("#archived-notes");
const loading = document.querySelector("loading-indicator");
const noteForm = document.querySelector("note-form");
const toast = document.querySelector("toast-message");

AOS.init({
  once: true,
  duration: 520,
  easing: "ease-out-cubic",
  disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

function setLoading(isLoading) {
  loading.hidden = !isLoading;
}

function showToast(message, type) {
  toast.show(message, type);
}

async function refreshNotes() {
  setLoading(true);

  try {
    const [activeNotes, archivedNotes] = await Promise.all([
      NotesApi.getNotes(),
      NotesApi.getArchivedNotes(),
    ]);

    activeList.notes = activeNotes;
    archivedList.notes = archivedNotes;
    AOS.refreshHard();
  } catch (error) {
    showToast(error.message || "Failed to load notes.", "error");
  } finally {
    setLoading(false);
  }
}

async function runAction(action, successMessage) {
  setLoading(true);

  try {
    await action();
    await refreshNotes();
    showToast(successMessage);
  } catch (error) {
    showToast(error.message || "Action failed.", "error");
  } finally {
    setLoading(false);
  }
}

document.addEventListener("note:add", (event) => {
  noteForm.busy = true;

  runAction(async () => {
    await NotesApi.addNote(event.detail);
    noteForm.reset();
  }, "Note added.").finally(() => {
    noteForm.busy = false;
  });
});

document.addEventListener("note:delete", (event) => {
  runAction(() => NotesApi.deleteNote(event.detail.id), "Note deleted.");
});

document.addEventListener("note:archive", (event) => {
  runAction(() => NotesApi.archiveNote(event.detail.id), "Note archived.");
});

document.addEventListener("note:unarchive", (event) => {
  runAction(() => NotesApi.unarchiveNote(event.detail.id), "Note restored.");
});

refreshNotes();
