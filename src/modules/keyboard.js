export default function createKeyboard(initLang, caps) {
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
      if (caps && element.small.length === 1) {
        key.innerText = element.small.toUpperCase();
      } else {
        key.innerText = element.small;
      }
      key.setAttribute('data', element.keyCode);
      key.setAttribute('shift', element.shift);
      key.setAttribute('small', element.small);
      keyboard.appendChild(key);
    }
    keyboard.appendChild(arrows);
  });
  return keyboard;
}
