class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "title", "body", "created-at", "archived"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    this.replaceChildren();

    const article = document.createElement("article");
    article.className = "note-card";

    const meta = document.createElement("p");
    meta.className = "note-card__date";
    meta.textContent = this.formatDate(this.getAttribute("created-at"));

    const title = document.createElement("h3");
    title.className = "note-card__title";
    title.textContent = this.getAttribute("title") || "Tanpa judul";

    const body = document.createElement("p");
    body.className = "note-card__body";
    body.textContent = this.getAttribute("body") || "";

    const actions = document.createElement("div");
    actions.className = "note-card__actions";

    const archiveButton = document.createElement("button");
    archiveButton.type = "button";
    archiveButton.className = "button-secondary";
    archiveButton.textContent = this.isArchived ? "Unarchive" : "Archive";
    archiveButton.addEventListener("click", () => {
      this.dispatchNoteEvent(
        this.isArchived ? "note:unarchive" : "note:archive"
      );
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
      this.dispatchNoteEvent("note:delete")
    );

    actions.append(archiveButton, deleteButton);
    article.append(meta, title, body, actions);
    this.append(article);
  }

  get isArchived() {
    return this.hasAttribute("archived");
  }

  dispatchNoteEvent(name) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: { id: this.getAttribute("note-id") },
      })
    );
  }

  formatDate(value) {
    if (!value) return "Baru saja";

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  }
}

customElements.define("note-item", NoteItem);
