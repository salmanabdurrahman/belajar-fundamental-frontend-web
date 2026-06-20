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
      this.append(document.createElement("empty-state"));
      return;
    }

    const grid = document.createElement("div");
    grid.className = "notes-grid";

    this.notes.forEach((note) => {
      const item = document.createElement("note-item");
      item.setAttribute("title", note.title);
      item.setAttribute("body", note.body);
      item.setAttribute("created-at", note.createdAt);
      grid.append(item);
    });

    this.append(grid);
  }
}

customElements.define("note-list", NoteList);
