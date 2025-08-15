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

function checkRegisteredPlayer() {
  if (localStorage.getItem('_NFC-name')) {
    showScreen('home');
  } else {
    showScreen('register');
  }
}

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
    // localStorage.setItem('_NFC-image', image.src);
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
const playerHealth = document.querySelector('.game__character-health.player');
const enemyHealth = document.querySelector('.game__character-health.enemy');
const enemyName = document.querySelector('.game__character-name.enemy-name');
const enemyImage = document.querySelector('.game__character-image.enemy-avatar img');
const gameLog = document.querySelector('.game__log');
const overlay = document.querySelector('.overlay');
const overlayText = document.querySelector('.overlay__text');
const overlayButton = document.querySelector('.overlay__close');
const gameButton = document.querySelector('.game-button');
const continueButton = document.querySelector('.continue-button');
const homeButton = document.querySelector('.home-button');
const wins = document.querySelector('.character__wins');
const losses = document.querySelector('.character__losses');

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
    attackZones: 1,
    defenseZones: 2,
    health: 120,
  },
  {
    name: 'Spider',
    attackZones: 3,
    defenseZones: 1,
    health: 70,
  },
  {
    name: 'Dragon',
    attackZones: 2,
    defenseZones: 1,
    health: 100,
  },
  {
    name: 'Goblin',
    attackZones: 2,
    defenseZones: 2,
    health: 80,
  },
  {
    name: 'Harpy',
    attackZones: 1,
    defenseZones: 1,
    health: 150,
  },
];

const zoneNames = ['head', 'neck', 'body', 'belly', 'legs'];

let enemy;
let winsCount = 0;
let lossesCount = 0;
let isGameActive = false;

const playerAttackZones = [];
const playerDefenseZones = [];

function setEnemy() {
  enemy = enemies[Math.floor(Math.random() * enemies.length)];
  console.log(enemy);

  enemyHealth.setAttribute('max', enemy.health);
  enemyHealth.setAttribute('value', enemy.health);

  enemyName.textContent = enemy.name;
  enemyImage.src = `assets/images/${enemy.name}.webp`;
}

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

  // console.log('player', playerAttackZones, playerDefenseZones);
}
function exchangeAttacks() {
  const enemyAttackZones = [];
  const enemyDefenseZones = [];

  for (let i = 0; i < enemy.attackZones; i++) {
    let zone;
    do {
      zone = Math.floor(Math.random() * 5);
    } while (enemyAttackZones.indexOf(zone) !== -1);
    enemyAttackZones.push(zone);
  }

  for (let i = 0; i < enemy.defenseZones; i++) {
    let zone;
    do {
      zone = Math.floor(Math.random() * 5);
    } while (enemyDefenseZones.indexOf(zone) !== -1);
    enemyDefenseZones.push(zone);
  }

  // console.log('enemy', enemyAttackZones, enemyDefenseZones);

  let playerDamage = 0;
  let enemyDamage = 0;

  for (let i = 0; i < playerAttackZones.length; i++) {
    const zone = playerAttackZones[i];
    const enemyZone = Math.floor(Math.random() * 5);
    const criticalChance = Math.random();
    const criticalDamage = 1.5;

    if (enemyZone !== zone) {
      if (criticalChance < 0.2) {
        playerDamage += 10 * criticalDamage;
        // console.log(`Player deals critical damage to ${zoneNames[zone]}!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${characterName.textContent}</span> attacks with <span class="log-critical">critical hit</span> to <span class="log-zone">${zoneNames[zone]}</span> and deals <span class="log-damage">${10 * criticalDamage}</span> damage!`;
        gameLog.appendChild(logString);
      } else {
        playerDamage += 10;
        // console.log(`Player deals damage to ${zoneNames[zone]}!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${characterName.textContent}</span> attacks to <span class="log-zone">${zoneNames[zone]}</span> and deals <span class="log-damage">10</span> damage!`;
        gameLog.appendChild(logString);
      }
    } else {
      if (criticalChance < 0.2) {
        playerDamage += 10 * criticalDamage;
        // console.log(`Player hits enemy's defense zone in ${zoneNames[zone]} and breaks through!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${characterName.textContent}</span> breaks through enemy's defense zone in <span class="log-zone">${zoneNames[zone]}</span> and deals <span class="log-damage">${10 * criticalDamage}</span> damage!`;
        gameLog.appendChild(logString);
      } else {
        // console.log(`Player hits enemy's defense zone in ${zoneNames[zone]}!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${characterName.textContent}</span> hits enemy's defense zone in <span class="log-zone">${zoneNames[zone]}</span>!`;
        gameLog.appendChild(logString);
      }
    }
  }

  for (let i = 0; i < enemyAttackZones.length; i++) {
    const zone = enemyAttackZones[i];
    const playerZone = Math.floor(Math.random() * 5);
    const criticalChance = Math.random();
    const criticalDamage = 1.5;

    if (playerZone !== zone) {
      if (criticalChance < 0.2) {
        enemyDamage += 10 * criticalDamage;
        // console.log(`Enemy deals critical damage to ${zoneNames[zone]}!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${enemyName.textContent}</span> attacks with <span class="log-critical">critical hit</span> to <span class="log-zone">${zoneNames[zone]}</span> and deals <span class="log-damage">${10 * criticalDamage}</span> damage!`;
        gameLog.appendChild(logString);
      } else {
        enemyDamage += 10;
        // console.log(`Enemy deals damage to ${zoneNames[zone]}!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${enemyName.textContent}</span> attacks to <span class="log-zone">${zoneNames[zone]}</span> and deals <span class="log-damage">10</span> damage!`;
        gameLog.appendChild(logString);
      }
    } else {
      if (criticalChance < 0.2) {
        enemyDamage += 10 * criticalDamage;
        // console.log(`Enemy hits player's defense zone in ${zoneNames[zone]} and breaks through!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${enemyName.textContent}</span> breaks through player's defense zone in <span class="log-zone">${zoneNames[zone]}</span> and deals <span class="log-damage">${10 * criticalDamage}</span> damage!`;
        gameLog.appendChild(logString);
      } else {
        // console.log(`Enemy hits player's defense zone in ${zoneNames[zone]}!`);
        const logString = document.createElement('p');
        logString.innerHTML = `<span class="log-name">${enemyName.textContent}</span> hits player's defense zone in <span class="log-zone">${zoneNames[zone]}</span>!`;
        gameLog.appendChild(logString);
      }
    }
  }

  playerHealth.value -= enemyDamage;
  enemyHealth.value -= playerDamage;

  // console.log(`Player received ${enemyDamage} damage!`);
  // console.log(`Enemy received ${playerDamage} damage!`);
}

function resetGame() {
  playerHealth.value = 150;
  attackZoneCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  defenseZoneCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  gameLog.innerHTML = '';
  attackButton.disabled = true;
}

attackButton.addEventListener('click', () => {
  chooseZones();
  exchangeAttacks();

  if (playerHealth.value <= 0 || enemyHealth.value <= 0) {
    isGameActive = false;
    overlay.classList.add('active');
    if (playerHealth.value <= 0) {
      overlayText.textContent = "Haha, you lost! But don't worry, it's not the end of the world!";
      lossesCount += 1;
      losses.textContent = `Losses: ${lossesCount}`;
    } else {
      overlayText.textContent = "Woohoo! You've conquered the game! Now go celebrate!";
      winsCount += 1;
      wins.textContent = `Wins: ${winsCount}`;
    }
  }
});

overlayButton.addEventListener('click', () => {
  overlay.classList.remove('active');
  showScreen('home');
  checkActiveGame();
});

gameButton.addEventListener('click', () => {
  resetGame();
  setEnemy();
  isGameActive = true;
});

function checkActiveGame() {
  if (isGameActive && playerHealth.value > 0 && enemyHealth.value > 0) {
    continueButton.disabled = false;
  } else {
    continueButton.disabled = true;
  }
}

checkActiveGame();

homeButton.addEventListener('click', () => {
  checkActiveGame();
});

function saveGame() {
  localStorage.setItem('_NFC-isGameActive', isGameActive);
  localStorage.setItem('_NFC-playerHealth', playerHealth.value);
  localStorage.setItem('_NFC-enemyHealth', enemyHealth.value);
  localStorage.setItem('_NFC-enemy', JSON.stringify(enemy));
  localStorage.setItem('_NFC-gameLog', gameLog.innerHTML);
  localStorage.setItem('_NFC-wins', winsCount);
  localStorage.setItem('_NFC-losses', lossesCount);
  localStorage.setItem('_NFC-playerImage', characterImage.src);
  localStorage.setItem(
    '_NFC-attackZones',
    JSON.stringify(Array.from(attackZoneCheckboxes).map((checkbox) => checkbox.checked)),
  );
  localStorage.setItem(
    '_NFC-defenseZones',
    JSON.stringify(Array.from(defenseZoneCheckboxes).map((checkbox) => checkbox.checked)),
  );
}
function loadGame() {
  if (localStorage.getItem('_NFC-isGameActive')) {
    isGameActive = localStorage.getItem('_NFC-isGameActive');
  }
  if (localStorage.getItem('_NFC-playerHealth')) {
    playerHealth.value = localStorage.getItem('_NFC-playerHealth');
  }
  if (localStorage.getItem('_NFC-enemyHealth')) {
    enemyHealth.value = localStorage.getItem('_NFC-enemyHealth');
  }
  if (localStorage.getItem('_NFC-enemy')) {
    enemy = JSON.parse(localStorage.getItem('_NFC-enemy'));

    enemyName.textContent = enemy.name;
    enemyImage.src = `assets/images/${enemy.name}.jpeg`;
    enemyHealth.setAttribute('max', enemy.health);
  }
  if (localStorage.getItem('_NFC-gameLog')) {
    gameLog.innerHTML = localStorage.getItem('_NFC-gameLog');
  }
  if (localStorage.getItem('_NFC-wins')) {
    winsCount = +localStorage.getItem('_NFC-wins');
    wins.textContent = `Wins: ${winsCount}`;
  }
  if (localStorage.getItem('_NFC-losses')) {
    lossesCount = +localStorage.getItem('_NFC-losses');
    losses.textContent = `Losses: ${lossesCount}`;
  }
  if (localStorage.getItem('_NFC-playerImage')) {
    characterImage.src = localStorage.getItem('_NFC-playerImage');
    gamePlayerImage.src = localStorage.getItem('_NFC-playerImage');
  }
  if (localStorage.getItem('_NFC-attackZones')) {
    attackZoneCheckboxes.forEach(
      (checkbox, index) => (checkbox.checked = JSON.parse(localStorage.getItem('_NFC-attackZones'))[index]),
    );
  }
  if (localStorage.getItem('_NFC-defenseZones')) {
    defenseZoneCheckboxes.forEach(
      (checkbox, index) => (checkbox.checked = JSON.parse(localStorage.getItem('_NFC-defenseZones'))[index]),
    );
  }
}

window.addEventListener('beforeunload', saveGame);

window.addEventListener('DOMContentLoaded', () => {
  loadGame();
  checkActiveGame();
  checkRegisteredPlayer();
  checkZones();
});
