const unitLength = 20;
let boxColorA = "Red";
let boxColorB = "Black";
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let grid;
let sliderA = document.querySelector("#speedContainer")
let sliderB = document.querySelector("#lifeContainer")
let sliderC = document.querySelector("#DieContainer")
let sliderD = document.querySelector("#ReproductionContainer")
let Life = 2;
let Die = 3;
let Reproduction = 3;
let A_Change;
let B_Change;

sliderA.addEventListener("change", (event) => {
  const value = parseInt(event.target.value)
  console.log("frameRate: ", value)
  frameRate(value)
})


sliderB.addEventListener("change", (event) => {
  const value = parseInt(event.target.value)
  console.log(value)
  Life = value
})


sliderC.addEventListener("change", (event) => {
  const value = parseInt(event.target.value)
  console.log(value)
  Die = value
})

sliderD.addEventListener("change", (event) => {
  const value = parseInt(event.target.value)
  console.log(value)
  Reproduction = value
})


const StartBtn = document.querySelector("#Startbutton")
StartBtn.addEventListener("click", (event) => {
  loop()
})

const PauseBtn = document.querySelector("#Pausebutton")
PauseBtn.addEventListener("click", (event) => {
  noLoop()
})

const ResetBtn = document.querySelector("#Resetbutton")
ResetBtn.addEventListener("click", (event) => {
  init();
  redraw();
  noLoop();
});

function key_background(){
  
}

// function Startbutton() {
//   let button = createButton("Start");
//   button.mousePressed(() => )
// }

// function Pausebutton() {
//   let button = createButton("Pause");
//   button.mousePressed(() => noLoop());
// }

// function Resetbutton() {
//   let button = createButton("Reset");
//   button.mousePressed(() => {
//     init();
//     redraw();
//     noLoop();
//   });
// }

// function KeyDown123(){
//   if(keyisDown(49)){
//     randomSpawnLife()
//   }
// }



function changeAColor() {
  A_Change = createSelect();

  A_Change.option('red');
  A_Change.option('green');
  A_Change.option('blue');

  A_Change.selected('red');
  A_Change.position(100,250)
  
}

function changeBColor() {
  B_Change = createSelect();

  B_Change.option("DarkRed");
  B_Change.option("Darkgreen");
  B_Change.option("DarkBlue");
  B_Change.position(200,250)
}

function windowResized() {
  // console.log("resize trigger")
  resizeCanvas(windowWidth - 200, windowHeight - 200);

  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }

  init();
}

function setup() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth - 200, windowHeight - 200);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard


  // Startbutton()
  // Pausebutton()
  // Resetbutton()
  changeAColor()
  changeBColor()

  noLoop()
}

function randomSpawnLife() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] != 1) {
        currentBoard[i][j] = random() > 0.8 ? 1 : 0;
        nextBoard[i][j] = 0;
      }
    }
  }
}

function init() {
  randomSpawnLife()
}

function draw() {
  
  boxColorA = A_Change.selected();
  boxColorB = B_Change.selected();
  background(255);
  generate();

  cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');

  // if (mouseIsPressed === ture){
  //   cursor(HAND)}else{curson(CROSS)}
  // }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == 1) {
        if (nextBoard[i][j] == 1) {
          fill(boxColorB)
        } else {
          fill(boxColorA);
        }
      } else {
        fill(255);
      }
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}


function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

      // Rules of Life
      if (currentBoard[x][y] == 1 && neighbors < Life) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > Die) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == Reproduction) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}


function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows || mouseX < 0) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  // currentBoard[x][y] = 1;
  // fill(boxColorA);
  // stroke(strokeColor);
  // rect(x * unitLength, y * unitLength, unitLength, unitLength);






}


const gliderPattern = `.O
..O
OOO`;

const gliderPattern2 = `..OOO...OOO

O....O.O....O
O....O.O....O
O....O.O....O
..OOO...OOO

..OOO...OOO
O....O.O....O
O....O.O....O
O....O.O....O

..OOO...OOO`;

function insertPattern(x,y) {
  //  console.log( gliderPattern.split('\n'))

  let parsedArray = gliderPattern.split('\n')
  console.log(parsedArray)
  for (let j in parsedArray) {
    console.log(j, "th row", parsedArray[j])
    for (let i in parsedArray[j]) {
      console.log(i, j, parsedArray[j][i])

      if (parsedArray[j][i] == 'O') {
        console.log("insert 1 at x+", i, "y+", j)

        currentBoard[x + Number(i)][y + Number(j)] = 1
        fill(boxColorA);
        stroke(strokeColor);
        rect((x + i) * unitLength, (y + j) * unitLength, unitLength, unitLength);

      }
    }
  }
}


/**
 * When mouse is pressed
 */
function mousePressed() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  // currentBoard[x][y] = 1;
  // fill(boxColorA);
  // stroke(strokeColor);
  // rect(x * unitLength, y * unitLength, unitLength, unitLength);

  insertPattern(x,y)
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  loop();
}

// Control speed of the Game of Life. (Checkout framerate(), you can use slider to control the framerate )


// Allow users to change the rules of survival.
// Allow users to change the rules of reproduction.
// Start/Stop the Game of life
// Multiple colors of life on the same board.
// Darken colors for stable life.
// Random initial states
// Well-known patterns of Game of Life to select from (Examples: Gosper Glider Gun, Glider, Lightweight train).
// Use Keyboard to control the cursor to place the life
// Resize board on windows resize (Check out windowsResized())
// Switching between different styles.
// Anything else that you could think of