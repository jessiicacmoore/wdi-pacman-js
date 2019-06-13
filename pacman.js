// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellet = 4;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: true
};

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: true
};

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: true
};

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: true
};

ghosts = [inky, blinky, pinky, clyde]

function is_edible(ghost) {
  if (ghost.edible) {
    return 'edible'
  } else {
    return 'inedible'
  }
}

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}     Power Pellets: ${powerPellet}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('\(d) Eat Dot');
  console.log('(p) Eat Power Pellet');
  console.log(`(1) Eat Inky (${is_edible(ghosts[0])})`);
  console.log(`(2) Eat Blinky (${is_edible(ghosts[1])})`);
  console.log(`(3) Eat Pinky (${is_edible(ghosts[2])})`);
  console.log(`(4) Eat Clyde (${is_edible(ghosts[3])})`);
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatPowerPellet() {
  console.log('\nChomp!');
  score += 50;
  powerPellet --;
}

function isGameOver() {
  if (lives == 0) {
    process.exit();
  }
}

function eatGhost(ghost) {
  
  if (ghost.edible) {
    console.log(`\nChomp!\n${ghost.name} is ${ghost.character}`);
    score += 200;
    ghost.edible = false;
  } else {
    console.log(`\nChomp!\n${ghost.name} has killed Pac Man`);
    lives --;
  }
  isGameOver();
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellet == 0) {
        console.log('\nNo Power-Pellets left!');
      } else {
        eatPowerPellet();
      }
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
