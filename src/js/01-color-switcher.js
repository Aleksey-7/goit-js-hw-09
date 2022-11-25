const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class ColorSwitcher {
  constructor({ onChangeColor }) {
    this.intervalId = null;
    this.isActive = false;
    this.onChangeColor = onChangeColor;
  }

  onShowStart() {
    if (this.isActive) {
      return;
    }

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const color = getRandomHexColor();

      this.onChangeColor(color);
    }, 1000);
  }

  onShowStop() {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;

    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

function onChangeBodyBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

const colorSwitcher = new ColorSwitcher({
  onChangeColor: onChangeBodyBackgroundColor,
});

refs.startBtn.addEventListener('click', () => colorSwitcher.onShowStart());
refs.stopBtn.addEventListener('click', () => colorSwitcher.onShowStop());
