class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["title", "body", "created-at"];
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

    article.append(meta, title, body);
    this.append(article);
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
