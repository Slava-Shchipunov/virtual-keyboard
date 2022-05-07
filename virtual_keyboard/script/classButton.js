class Button {
  constructor(name) {
    this.name = name;
    this.button = null;
  }

  create() {
    this.button = document.createElement('button');
    this.button.textContent = this.name;
    this.button.classList.add('button');
  }

  change(data) {
    this.button.textContent = data;
  }
}

export default Button;
