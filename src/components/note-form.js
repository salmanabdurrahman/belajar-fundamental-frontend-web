const rules = {
  title: { min: 5, message: "Title must be at least 5 characters." },
  body: { min: 10, message: "Note body must be at least 10 characters." },
};

class NoteForm extends HTMLElement {
  set busy(value) {
    this._busy = Boolean(value);
    if (this.submitButton)
      this.submitButton.disabled = this._busy || !this.validate(false);
  }

  get busy() {
    return Boolean(this._busy);
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="note-form-card" aria-labelledby="form-heading">
        <h2 id="form-heading">Add Note</h2>
        <form novalidate>
          <div class="field">
            <label for="note-title">Note Title</label>
            <input
              id="note-title"
              name="title"
              type="text"
              placeholder="Example: Final project idea"
              autocomplete="off"
              required
              minlength="5"
              aria-describedby="title-error"
            />
            <small id="title-error" class="field__error" aria-live="polite"></small>
          </div>
          <div class="field">
            <label for="note-body">Note Body</label>
            <textarea
              id="note-body"
              name="body"
              rows="6"
              placeholder="Write note details here..."
              required
              minlength="10"
              aria-describedby="body-error"
            ></textarea>
            <small id="body-error" class="field__error" aria-live="polite"></small>
          </div>

          <button type="submit">Add Note</button>
        </form>
      </section>
    `;

    this.form = this.querySelector("form");
    this.titleInput = this.querySelector("#note-title");
    this.bodyInput = this.querySelector("#note-body");
    this.submitButton = this.querySelector("button");

    this.titleInput.addEventListener("input", () => this.validate(true));
    this.bodyInput.addEventListener("input", () => this.validate(true));
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.validate(false);
  }

  validate(showErrors = true) {
    const titleValid = this.validateField(
      this.titleInput,
      rules.title,
      "#title-error",
      showErrors
    );
    const bodyValid = this.validateField(
      this.bodyInput,
      rules.body,
      "#body-error",
      showErrors
    );
    const valid = titleValid && bodyValid;

    this.submitButton.disabled = this.busy || !valid;
    return valid;
  }

  validateField(input, rule, errorSelector, showErrors) {
    const value = input.value.trim();
    const error = this.querySelector(errorSelector);
    const message =
      value.length === 0 ? "This field is required." : rule.message;
    const valid = value.length >= rule.min;

    error.textContent = valid || !showErrors ? "" : message;
    input.setAttribute("aria-invalid", String(showErrors && !valid));

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validate(true)) return;

    this.dispatchEvent(
      new CustomEvent("note:add", {
        bubbles: true,
        detail: {
          title: this.titleInput.value.trim(),
          body: this.bodyInput.value.trim(),
        },
      })
    );
  }

  reset() {
    this.form.reset();
    this.validate(false);
    this.titleInput.focus();
  }
}

customElements.define("note-form", NoteForm);
