const gameWrapper = document.querySelector(".game");
const homeWrapper = document.querySelector(".home");
const characterWrapper = document.querySelector(".character");
const settingsWrapper = document.querySelector(".settings");
const homeButton = document.querySelector(".home-button");
const gameButton = document.querySelector(".game-button");
const characterButton = document.querySelector(".character-button");
const settingsButton = document.querySelector(".settings-button");

const home = () => {
  gameWrapper.style.display = "none";
  homeWrapper.style.display = "block";
  characterWrapper.style.display = "none";
  settingsWrapper.style.display = "none";
};

const game = () => {
  gameWrapper.style.display = "block";
  homeWrapper.style.display = "none";
  characterWrapper.style.display = "none";
  settingsWrapper.style.display = "none";
};

const character = () => {
  gameWrapper.style.display = "none";
  homeWrapper.style.display = "none";
  characterWrapper.style.display = "block";
  settingsWrapper.style.display = "none";
};

const settings = () => {
  gameWrapper.style.display = "none";
  homeWrapper.style.display = "none";
  characterWrapper.style.display = "none";
  settingsWrapper.style.display = "block";
};

homeButton.addEventListener("click", home);
gameButton.addEventListener("click", game);
characterButton.addEventListener("click", character);
settingsButton.addEventListener("click", settings);
