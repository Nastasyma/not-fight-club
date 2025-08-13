const screens = document.querySelectorAll('.screen');
const buttons = document.querySelectorAll('.button');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
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

// screens
function showScreen(screenName) {
  screens.forEach((screen) => {
    screen.classList.remove('active');
  });
  document.querySelector(`.${screenName}`).classList.add('active');
  pageTitle.textContent = screenName.charAt(0).toUpperCase() + screenName.slice(1);

  if (screenName === 'register') {
    header.classList.add('hidden');
    footer.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
    footer.classList.remove('hidden');
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const screenName = button.getAttribute('data-screen');
    showScreen(screenName);
  });
});

showScreen('register');

// character

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

[nameInput, settingsInput].forEach((input, index) => {
  const button = index === 0 ? registerButton : settingsSave;
  input.addEventListener('input', () => {
    button.disabled = input.value.length < 1;
  });
});

function setCharacterName() {
  if (!localStorage.getItem('_NFC-name')) {
    return;
  }
  characterName.textContent = localStorage.getItem('_NFC-name');
  gameCharacterName.textContent = localStorage.getItem('_NFC-name');
  settingsName.textContent = localStorage.getItem('_NFC-name');
}

setCharacterName();

// game

const attackButton = document.querySelector('.game__actions-button');
const attackZoneCheckboxes = document.querySelectorAll('.game__actions-field_attack-zones input[type="checkbox"]');
const defenseZoneCheckboxes = document.querySelectorAll('.game__actions-field_defence-zones input[type="checkbox"]');

function checkZones() {
  const attackZonesSelected = Array.from(attackZoneCheckboxes).filter((checkbox) => checkbox.checked).length;
  const defenseZonesSelected = Array.from(defenseZoneCheckboxes).filter((checkbox) => checkbox.checked).length;

  attackButton.disabled = !(attackZonesSelected === 1 && defenseZonesSelected === 2);
}

attackZoneCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', checkZones));
defenseZoneCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', checkZones));

checkZones();

const enemies = [
  {
    name: 'Beast',
    attackZones: 2,
    defenseZones: 1,
  },
  {
    name: 'Spider',
    attackZones: 1,
    defenseZones: 2,
  },
  {
    name: 'Dragon',
    attackZones: 2,
    defenseZones: 1,
  },
];

const enemy = enemies[Math.floor(Math.random() * enemies.length)];
console.log(enemy);

const playerAttackZones = [];
const playerDefenseZones = [];

function chooseZones() {
  playerAttackZones.length = 0;
  playerDefenseZones.length = 0;

  const attackZone = document.querySelector('.game__actions-field_attack-zones input[type="checkbox"]:checked');
  playerAttackZones.push(parseInt(attackZone.getAttribute('data-index')));

  const defenseZones = document.querySelectorAll('.game__actions-field_defence-zones input[type="checkbox"]:checked');
  playerDefenseZones.push(
    parseInt(defenseZones[0].getAttribute('data-index')),
    parseInt(defenseZones[1].getAttribute('data-index')),
  );

  console.log('player', playerAttackZones, playerDefenseZones);
}
function exchangeBlows() {
  const enemyAttackZones = [];
  const enemyDefenseZones = [];
  for (let i = 0; i < enemy.attackZones; i++) {
    enemyAttackZones.push(Math.floor(Math.random() * 5));
  }
  for (let i = 0; i < enemy.defenseZones; i++) {
    enemyDefenseZones.push(Math.floor(Math.random() * 5));
  }

  console.log('enemy', enemyAttackZones, enemyDefenseZones);

  let playerDamage = 0;
  let enemyDamage = 0;

  for (let i = 0; i < playerAttackZones.length; i++) {
    const zone = playerAttackZones[i];
    const enemyZone = Math.floor(Math.random() * 5);
    if (enemyZone !== zone) {
      playerDamage += 10;
      console.log(`Player deals damage to ${zone}!`);
    } else {
      console.log(`Player hits enemy's defense zone in  ${zone}!`);
    }
  }

  for (let i = 0; i < enemyAttackZones.length; i++) {
    const zone = enemyAttackZones[i];
    const playerZone = Math.floor(Math.random() * 5);
    if (playerZone !== zone) {
      enemyDamage += 10;
      console.log(`Enemy deals damage to ${zone}!`);
    } else {
      console.log(`Enemy hits player's defense zone in ${zone}!`);
    }
  }

  const playerHealth = document.querySelector('.game__character-health.player');
  const enemyHealth = document.querySelector('.game__character-health.enemy');
  playerHealth.value -= enemyDamage;
  enemyHealth.value -= playerDamage;

  console.log(`Player received ${enemyDamage} damage!`);
  console.log(`Enemy received ${playerDamage} damage!`);
}

function startBattle() {
  chooseZones();
  exchangeBlows();
}
document.querySelector('.game__actions-button').addEventListener('click', startBattle);
