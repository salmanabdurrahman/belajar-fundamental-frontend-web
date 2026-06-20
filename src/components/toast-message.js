class ToastMessage extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "status");
    this.setAttribute("aria-live", "polite");
  }

  show(message, type = "success") {
    this.textContent = message;
    this.dataset.type = type;
    this.hidden = false;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.hidden = true;
    }, 3000);
  }
}

customElements.define("toast-message", ToastMessage);
