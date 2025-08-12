const screens = document.querySelectorAll('.screen');
const buttons = document.querySelectorAll('.button');
const settingsNameWrapper = document.querySelector('.settings__name-wrapper');
const settingsInputWrapper = document.querySelector('.settings__input-wrapper');
const settingsSave = document.querySelector('.settings__save-button');
const settingsChange = document.querySelector('.settings__change-button');
const pageTitle = document.querySelector('.header__page-title');
const characterPopup = document.querySelector('.character__popup');
const characterEdit = document.querySelector('.character__edit');
const characterPopupClose = document.querySelector('.character__popup-close');
const registerButton = document.querySelector('.register-button');
const nameInput = document.getElementById('name');
const characterName = document.querySelector('.character__name');
const gameCharacterName = document.querySelector('.game__character-name');
const settingsName = document.querySelector('.settings__name');
const settingsInput = document.getElementById('settings-name');
const popupImages = document.querySelectorAll('.character__popup-item img');
const characterImage = document.querySelector('.character__image');
const gamePlayerImage = document.querySelector('.player-avatar img');

function showScreen(screenName) {
  screens.forEach((screen) => {
    screen.classList.remove('active');
  });
  document.querySelector(`.${screenName}`).classList.add('active');
  pageTitle.textContent = screenName.charAt(0).toUpperCase() + screenName.slice(1);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const screenName = button.getAttribute('data-screen');
    showScreen(screenName);
  });
});

settingsChange.addEventListener('click', () => {
  settingsNameWrapper.style.display = 'none';
  settingsInputWrapper.style.display = 'flex';
  settingsSave.style.display = 'flex';
});

settingsSave.addEventListener('click', () => {
  settingsNameWrapper.style.display = 'flex';
  settingsInputWrapper.style.display = 'none';
  settingsSave.style.display = 'none';
});

characterEdit.addEventListener('click', () => {
  characterPopup.classList.add('active');
});

characterPopupClose.addEventListener('click', () => {
  characterPopup.classList.remove('active');
});

popupImages.forEach((image) => {
  image.addEventListener('click', () => {
    characterImage.src = image.src;
    gamePlayerImage.src = image.src;
    characterPopup.classList.remove('active');
  });
});

registerButton.addEventListener('click', () => {
  localStorage.setItem('_NFC-name', nameInput.value);
  setCharacterName();
});

settingsSave.addEventListener('click', () => {
  localStorage.setItem('_NFC-name', settingsInput.value);
  setCharacterName();
});

nameInput.addEventListener('input', () => {
  if (nameInput.value.length >= 1) {
    registerButton.disabled = false;
  } else {
    registerButton.disabled = true;
  }
});

settingsInput.addEventListener('input', () => {
  if (settingsInput.value.length >= 1) {
    settingsSave.disabled = false;
  } else {
    settingsSave.disabled = true;
  }
});

function setCharacterName() {
  if (!localStorage.getItem('_NFC-name')) {
    return;
  }
  characterName.textContent = localStorage.getItem('_NFC-name');
  gameCharacterName.textContent = localStorage.getItem('_NFC-name');
  settingsName.textContent = localStorage.getItem('_NFC-name');
}

showScreen('register');
setCharacterName();