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
  document.body.addEventListener('keydown', onKeyDown);
  // eslint-disable-next-line no-use-before-define
  document.body.addEventListener('keyup', onKeyUp);
}

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

function switchLanguage() {
  if (localStorage.getItem('language') === 'eng') {
    // eslint-disable-next-line no-use-before-define
    document.body.lastChild.replaceWith(createKeyboard(lang.ru, isCaps));
    // eslint-disable-next-line no-use-before-define
    addListeners();
    localStorage.setItem('language', 'ru');
  } else {
    // eslint-disable-next-line no-use-before-define
    document.body.lastChild.replaceWith(createKeyboard(lang.eng, isCaps));
    // eslint-disable-next-line no-use-before-define
    addListeners();
    localStorage.setItem('language', 'eng');
  }
}

const presedKeys = new Set();
let isCaps = false;

const onKeyDown = (event) => {
  const textArea = document.querySelector('.input');
  const modifications = ['ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'CapsLock'];
  if (isValidKey(event)) {
    event.preventDefault();
    const pressedKey = document.querySelector(`.key[data=${event.code}]`);
    pressedKey.classList.add('active');
    if (pressedKey.getAttribute('data') === 'Tab') {
      textArea.value += '\t';
      return;
    }
    if (pressedKey.getAttribute('data') === 'Space') {
      textArea.value += ' ';
      return;
    }
    if (pressedKey.getAttribute('data') === 'Backspace') {
      const caretPos = textArea.selectionStart;
      if (!caretPos) return;
      textArea.value = `${textArea.value.slice(0, caretPos - 1)}${textArea.value.slice(caretPos)}`;
      textArea.selectionEnd = caretPos - 1;
      return;
    }
    if (pressedKey.getAttribute('data') === 'Delete') {
      const caretPos = textArea.selectionStart;
      if (!caretPos) return;
      textArea.value = `${textArea.value.slice(0, caretPos)}${textArea.value.slice(caretPos + 1)}`;
      textArea.selectionEnd = caretPos;
      return;
    }
    if (pressedKey.getAttribute('data') === 'Enter') {
      textArea.value += '\n';
      return;
    }
    if (modifications.includes(pressedKey.getAttribute('data'))) {
      presedKeys.add(event.code);
      if (presedKeys.has('CapsLock')) {
        if (!isCaps) {
          const key = document.querySelectorAll('.key');
          key.forEach((k) => {
            // eslint-disable-next-line max-len
            if (!((k.innerText.length === 1) && (k.innerText.toUpperCase() !== k.innerText.toLowerCase()))) return;
            // eslint-disable-next-line no-param-reassign
            k.innerText = k.innerText.toUpperCase();
            isCaps = true;
          });
        } else {
          const key = document.querySelectorAll('.key');
          key.forEach((k) => {
            // eslint-disable-next-line max-len
            if (!((k.innerText.length === 1) && (k.innerText.toUpperCase() !== k.innerText.toLowerCase()))) return;
            // eslint-disable-next-line no-param-reassign
            k.innerText = k.innerText.toLowerCase();
            isCaps = false;
          });
        }
      }
      return;
    }
    textArea.value += pressedKey.innerText;
  }
};

const onKeyUp = (event) => {
  if (isValidKey(event)) {
    document.querySelector(`.key[data=${event.code}]`).classList.remove('active');
    if (isCaps) { document.querySelector('.capsLock').classList.add('active'); }
    if (presedKeys.has('AltLeft') && presedKeys.has('ControlLeft')) switchLanguage();
    presedKeys.delete(event.code);
  }
};

function addListeners() {
  document.body.addEventListener('keydown', onKeyDown);
  document.body.addEventListener('keyup', onKeyUp);
}

init();
