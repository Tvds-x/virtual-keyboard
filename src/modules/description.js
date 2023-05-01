export default function createDescription() {
  const description = document.createElement('div');
  description.classList.add('description');
  const systemDescription = document.createElement('p');
  systemDescription.innerText = 'Created in Ubuntu WSL';
  systemDescription.classList.add('system-desc');
  const langSwitchDescription = document.createElement('p');
  langSwitchDescription.innerText = 'Language switch: Left Ctrl + Left Alt';
  langSwitchDescription.classList.add('lang-desc');

  description.append(systemDescription, langSwitchDescription);
  return description;
}
