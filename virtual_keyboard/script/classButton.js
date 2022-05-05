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
}

export default Button;
