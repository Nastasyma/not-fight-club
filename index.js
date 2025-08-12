const screens = document.querySelectorAll('.screen');
const buttons = document.querySelectorAll('.button');
const settingsName = document.querySelector('.settings__name-wrapper');
const settingsInput = document.querySelector('.settings__input-wrapper');
const settingsSave = document.querySelector('.settings__save-button');
const settingsChange = document.querySelector('.settings__change-button');
const pageTitle = document.querySelector('.header__page-title');

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
  settingsName.style.display = 'none';
  settingsInput.style.display = 'flex';
  settingsSave.style.display = 'flex';
});

settingsSave.addEventListener('click', () => {
  settingsName.style.display = 'flex';
  settingsInput.style.display = 'none';
  settingsSave.style.display = 'none';
});

// const gameWrapper = document.querySelector(".game");
// const registerWrapper = document.querySelector(".register");
// const homeWrapper = document.querySelector(".home");
// const characterWrapper = document.querySelector(".character");
// const settingsWrapper = document.querySelector(".settings");
// const homeButton = document.querySelector(".home-button");
// const gameButton = document.querySelector(".game-button");
// const characterButton = document.querySelector(".character-button");
// const settingsButton = document.querySelector(".settings-button");
// const registerButton = document.querySelector(".register-button");
// const pageTitle = document.querySelector(".header__page-title");

// const home = () => {
//   gameWrapper.style.display = "none";
//   homeWrapper.style.display = "block";
//   characterWrapper.style.display = "none";
//   settingsWrapper.style.display = "none";
//   registerWrapper.style.display = "none";
//   pageTitle.textContent = "Home";
// };

// const game = () => {
//   gameWrapper.style.display = "block";
//   homeWrapper.style.display = "none";
//   characterWrapper.style.display = "none";
//   settingsWrapper.style.display = "none";
//   registerWrapper.style.display = "none";
//   pageTitle.textContent = "Battle";
// };

// const character = () => {
//   gameWrapper.style.display = "none";
//   homeWrapper.style.display = "none";
//   characterWrapper.style.display = "flex";
//   settingsWrapper.style.display = "none";
//   registerWrapper.style.display = "none";
//   pageTitle.textContent = "Character";
// };

// const settings = () => {
//   gameWrapper.style.display = "none";
//   homeWrapper.style.display = "none";
//   characterWrapper.style.display = "none";
//   settingsWrapper.style.display = "block";
//   registerWrapper.style.display = "none";
//   pageTitle.textContent = "Settings";
// };

// homeButton.addEventListener("click", home);
// gameButton.addEventListener("click", game);
// characterButton.addEventListener("click", character);
// settingsButton.addEventListener("click", settings);
// registerButton.addEventListener("click", home);
