import lang from './lang/lang.js';
import createDescription from './modules/description.js';
import createTextArea from './modules/textarea.js';
import createKeyboard from './modules/keyboard.js';

const keyDownHandler = (event) => {
  // event.preventDefault();
  document.querySelector(`.key[data=${event.code}]`).classList.add('active');
};
const keyUpHandler = (event) => {
  document.querySelector(`.key[data=${event.code}]`).classList.remove('active');
};

document.body.appendChild(createDescription());
document.body.appendChild(createTextArea());
document.body.appendChild(createKeyboard(lang.ru));

document.body.addEventListener('keydown', keyDownHandler);
document.body.addEventListener('keyup', keyUpHandler);
