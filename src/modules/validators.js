import ru from '../lang/ru.js';

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
function isValidClick(event) {
  return event.target === document.querySelector('.keyboard') || event.target === document.querySelector('.arrows');
}

export { isValidKey, isValidClick };
