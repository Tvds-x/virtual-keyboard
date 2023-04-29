import lang from './lang/lang.js';

function createKeyboard(initLang) {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  const additionalClasses = ['Backspace', 'Delete', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'Space'];
  const additionalClassesToArrows = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];
  const arrows = document.createElement('div');
  arrows.classList.add('arrows');
  initLang.forEach((element) => {
    const key = document.createElement('div');
    key.classList.add('key');
    if (additionalClasses.includes(element.keyCode)) {
      key.classList.add(`${element.keyCode.charAt(0).toLowerCase() + element.keyCode.slice(1)}`);
      key.innerText = element.small;
      key.setAttribute('data', element.keyCode);
      keyboard.appendChild(key);
    } else if (additionalClassesToArrows.includes(element.keyCode)) {
      key.classList.add(`${element.keyCode.charAt(0).toLowerCase() + element.keyCode.slice(1)}`);
      key.innerText = element.small;
      key.setAttribute('data', element.keyCode);
      arrows.appendChild(key);
    } else {
      key.innerText = element.small;
      key.setAttribute('data', element.keyCode);
      keyboard.appendChild(key);
    }
    keyboard.appendChild(arrows);
  });
  return keyboard;
}

const keyDownHandler = (event) => {
  event.preventDefault();
  document.querySelector(`.key[data=${event.code}]`).classList.add('active');
};
const keyUpHandler = (event) => {
  document.querySelector(`.key[data=${event.code}]`).classList.remove('active');
};

function createDescription() {
  const description = document.createElement('div');
  description.classList.add('description');
  const systemDescription = document.createElement('p');
  systemDescription.innerText = 'Created in Ubuntu WSL';
  systemDescription.classList.add('system-desc');
  const langSwitchDescription = document.createElement('p');
  langSwitchDescription.innerText = 'Language switch: LShift + Alt';
  langSwitchDescription.classList.add('lang-desc');

  description.append(systemDescription, langSwitchDescription);
  return description;
}

function createTextArea() {
  const textArea = document.createElement('textarea');
  textArea.classList.add('input');
  textArea.setAttribute('cols', 145);
  textArea.setAttribute('rows', 7);
  return textArea;
}

document.body.appendChild(createDescription());
document.body.appendChild(createTextArea());
document.body.appendChild(createKeyboard(lang.ru));

document.body.addEventListener('keydown', keyDownHandler);
document.body.addEventListener('keyup', keyUpHandler);
