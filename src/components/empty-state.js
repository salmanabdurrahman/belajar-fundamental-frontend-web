class EmptyState extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="empty-state" role="status">
        <p class="eyebrow">Empty</p>
        <h3>No notes yet.</h3>
        <p>Add your first note using the form nearby.</p>
      </div>
    `;
  }
}

customElements.define("empty-state", EmptyState);
