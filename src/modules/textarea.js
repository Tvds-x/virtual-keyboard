export default function createTextArea() {
  const textArea = document.createElement('textarea');
  textArea.classList.add('input');
  textArea.setAttribute('cols', 145);
  textArea.setAttribute('rows', 7);
  return textArea;
}
