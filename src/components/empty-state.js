class EmptyState extends HTMLElement {
  static get observedAttributes() {
    return ["title", "copy"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    this.innerHTML = `
      <div class="empty-state" role="status">
        <p class="eyebrow">Empty</p>
        <h3>${this.getAttribute("title") || "No notes yet."}</h3>
        <p>${this.getAttribute("copy") || "Add your first note using the form nearby."}</p>
      </div>
    `;
  }
}

customElements.define("empty-state", EmptyState);
