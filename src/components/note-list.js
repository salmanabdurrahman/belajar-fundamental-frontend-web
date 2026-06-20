class NoteList extends HTMLElement {
  set notes(value) {
    this._notes = Array.isArray(value) ? value : [];
    this.render();
  }

  get notes() {
    return this._notes || [];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.replaceChildren();

    if (this.notes.length === 0) {
      const emptyState = document.createElement("empty-state");
      emptyState.setAttribute(
        "title",
        this.getAttribute("empty-title") || "No notes yet."
      );
      emptyState.setAttribute(
        "copy",
        this.getAttribute("empty-copy") ||
          "Add your first note using the form nearby."
      );
      this.append(emptyState);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "notes-grid";

    this.notes.forEach((note) => {
      const item = document.createElement("note-item");
      item.dataset.aos = "fade-up";
      item.setAttribute("note-id", note.id);
      item.setAttribute("title", note.title);
      item.setAttribute("body", note.body);
      item.setAttribute("created-at", note.createdAt);
      if (this.hasAttribute("archived") || note.archived) {
        item.setAttribute("archived", "");
      }
      grid.append(item);
    });

    this.append(grid);
  }
}

customElements.define("note-list", NoteList);
