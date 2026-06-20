class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="top-nav">
        <a class="brand" href="./" aria-label="Notes App home">
          <span>Notes</span>
        </a>
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);
