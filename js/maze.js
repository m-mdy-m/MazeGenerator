// Declare variables
let cols, // Number of columns in the grid
  rows, // Number of rows in the grid
  w = 40, // Width and height of each cell in the grid
  grid = [], // Array to store all cells in the grid
  stack = [], // Stack for backtracking during generation
  speed = 50, // Speed of animation in milliseconds
  context, // Canvas context
  current; // Current cell being processed

// Function to create the canvas
function Canvas() {
  const canvas = document.createElement("canvas"); // Create a canvas element
  const width = (canvas.width = 800); // Set canvas width
  const height = (canvas.height = 800); // Set canvas height
  canvas.style.backgroundColor = "#3D3B40"; // Set background color
  context = canvas.getContext("2d"); // Get canvas 2D rendering context
  cols = Math.floor(width / w); // Calculate number of columns
  rows = Math.floor(height / w); // Calculate number of rows
  document.body.appendChild(canvas); // Append canvas to the document body

  createCell(rows, cols); // Create cells for the grid
}

// Function to draw a line between two points
function line(moveX, moveY, LineX, LineY) {
  context.beginPath(); // Begin path
  context.moveTo(moveX, moveY); // Move to starting point
  context.lineTo(LineX, LineY); // Draw a line to ending point
  context.stroke(); // Stroke the line
}

// Function to get the index of a cell in the grid array
function getIndex(column, row) {
  if (column < 0 || row < 0 || column > cols - 1 || row > rows - 1) {
    return -1; // Out of bounds, return -1
  }
  return column + row * cols; // Calculate index based on column and row
}

// Class representing a cell in the grid
class Cell {
  constructor(column, row) {
    this.column = column; // Column index of the cell
    this.row = row; // Row index of the cell
    this.visited = false; // Flag to indicate if the cell has been visited
    this.walls = [true, true, true, true]; // Array representing walls (top, right, bottom, left)
  }

  // Function to draw the cell
  show() {
    let x = this.column * w; // X-coordinate of the cell
    let y = this.row * w; // Y-coordinate of the cell
    context.strokeStyle = "#3652AD"; // Set stroke color
    context.lineWidth = 2; // Set line width
    // Draw walls based on their existence
    if (this.walls[0]) {
      line(x, y, x + w, y); // Top wall
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); // Right wall
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); // Bottom wall
    }
    if (this.walls[3]) {
      line(x, y + w, x, y); // Left wall
    }
    // If the cell is visited, fill it with a different color
    if (this.visited) {
      context.fillStyle = "#474F7A";
      context.fillRect(x, y, w, w);
    }
  }

  // Function to check neighboring cells
  check() {
    let neighbors = [];
    let top = grid[getIndex(this.column, this.row - 1)];
    let right = grid[getIndex(this.column + 1, this.row)];
    let bottom = grid[getIndex(this.column, this.row + 1)];
    let left = grid[getIndex(this.column - 1, this.row)];
    // Add unvisited neighboring cells to the list of neighbors
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    // Randomly select and return one of the unvisited neighbors
    if (neighbors.length > 0) {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    } else {
      return undefined; // No unvisited neighbors
    }
  }

  // Function to highlight the cell
  highlight() {
    let x = this.column * w;
    let y = this.row * w;
    context.fillStyle = "#294B29"; // Set fill color
    context.fillRect(x, y, w, w); // Fill the cell with color
  }
}

// Function to create the grid of cells
function createCell(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      grid.push(new Cell(y, x)); // Create and add a new cell to the grid
    }
  }
  current = grid[0]; // Set the current cell to the first cell in the grid
}

// Function to remove walls between two adjacent cells
function removeWalls(a, b) {
  let x = a.column - b.column;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.row - b.row;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

// Function to recursively draw the grid and generate the maze
function draw() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show(); // Draw each cell in the grid
  }
  current.visited = true; // Mark the current cell as visited
  const next = current.check(); // Check for unvisited neighboring cells
  current.highlight(); // Highlight the current cell
  if (next) {
    next.visited = true; // Mark the next cell as visited
    stack.push(current); // Push the current cell onto the stack
    removeWalls(current, next); // Remove walls between the current and next cells
    current = next; // Update the current cell to the next cell
    setTimeout(draw, speed); // Call draw function recursively with a delay
  } else if (stack.length > 0) {
    current = stack.pop(); // Pop a cell from the stack and set it as the current cell
    setTimeout(draw, speed); // Call draw function recursively with a delay
  }
}

// Initialize the canvas and start drawing the maze
Canvas();
draw();
