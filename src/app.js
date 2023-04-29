import lang from './lang/lang.js';
import createDescription from './modules/description.js';
import createTextArea from './modules/textarea.js';
import createKeyboard from './modules/keyboard.js';
import ru from './lang/ru.js';

function init() {
  document.body.appendChild(createDescription());
  document.body.appendChild(createTextArea());
  if (localStorage.getItem('language')) {
    if (localStorage.getItem('language') === 'ru') {
      document.body.appendChild(createKeyboard(lang.ru));
    } else {
      document.body.appendChild(createKeyboard(lang.eng));
    }
  } else {
    document.body.appendChild(createKeyboard(lang.ru));
    localStorage.setItem('language', 'ru');
  }
  // eslint-disable-next-line no-use-before-define
  document.body.addEventListener('keydown', keyDownHandler);
  // eslint-disable-next-line no-use-before-define
  document.body.addEventListener('keyup', keyUpHandler);
}

let altFlag = false;

function isValidKey(event) {
  let flag = false;
  ru.forEach((key) => {
    if (event.code === key.keyCode) flag = true;
  });
  if (flag) {
    return true;
  }
  return false;
}

const keyDownHandler = (event) => {
  if (isValidKey(event)) {
    event.preventDefault();
    document.querySelector(`.key[data=${event.code}]`).classList.add('active');
    if (event.code === 'AltLeft') altFlag = true;
    if (event.code === 'ShiftLeft' && altFlag) {
      altFlag = false;
      if (localStorage.getItem('language') === 'eng') {
        document.body.lastChild.replaceWith(createKeyboard(lang.ru));
        // eslint-disable-next-line no-use-before-define
        addListeners();
        localStorage.setItem('language', 'ru');
      } else {
        document.body.lastChild.replaceWith(createKeyboard(lang.eng));
        // eslint-disable-next-line no-use-before-define
        addListeners();
        localStorage.setItem('language', 'eng');
      }
    }
  }
};

const keyUpHandler = (event) => {
  if (isValidKey(event)) {
    document.querySelector(`.key[data=${event.code}]`).classList.remove('active');
  }
};

function addListeners() {
  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);
}

init();
