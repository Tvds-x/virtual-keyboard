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
      keyboard.appendChild(key);
    } else if (additionalClassesToArrows.includes(element.keyCode)) {
      key.classList.add(`${element.keyCode.charAt(0).toLowerCase() + element.keyCode.slice(1)}`);
      key.innerText = element.small;
      arrows.appendChild(key);
    } else {
      key.innerText = element.small;
      keyboard.appendChild(key);
    }
    keyboard.appendChild(arrows);
  });
  return keyboard;
}
// const keyHandler = (event) => {
//   document.querySelectorAll('.keys').forEach()
//   console.log(event);
// };

document.body.appendChild(createKeyboard(lang.ru));

// document.body.onkeydown = keyHandler;

// const keys = document.querySelectorAll('.key');
// keys.forEach((key) => {
//   key.addEventListener('click', keyHandler);
// });
