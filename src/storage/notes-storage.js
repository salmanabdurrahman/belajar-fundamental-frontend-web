const STORAGE_KEY = "notes-app:notes";

export function loadNotes(defaultNotes) {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (!savedNotes) return [...defaultNotes];

    const notes = JSON.parse(savedNotes);
    return Array.isArray(notes) ? notes : [...defaultNotes];
  } catch (error) {
    console.warn("Failed to load notes from localStorage.", error);
    return [...defaultNotes];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn("Failed to save notes to localStorage.", error);
  }
}
