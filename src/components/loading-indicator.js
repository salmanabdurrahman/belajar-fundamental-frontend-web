class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.hidden = true;
    this.innerHTML = `
      <div class="loading" role="status" aria-live="polite">
        <span class="loading__spinner" aria-hidden="true"></span>
        <span>Loading notes...</span>
      </div>
    `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
