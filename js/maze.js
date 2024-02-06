let cols,
  rows,
  w = 80,
  grid = [],
  context,
  current;
function Canvas() {
  const canvas = document.createElement("canvas");
  const width = (canvas.width = 800);
  const height = (canvas.height = 800);
  canvas.style.backgroundColor = "#3D3B40";
  context = canvas.getContext("2d");
  cols = Math.floor(width / w);
  rows = Math.floor(height / w);
  document.body.appendChild(canvas);

  createCell(rows, cols);
}
function line(moveX, moveY, LineX, LineY) {
  context.beginPath();
  context.moveTo(moveX, moveY);
  context.lineTo(LineX, LineY);
  context.stroke();
}

function getIndex(column, row) {
  if (column < 0 || row < 0 || column > cols - 1 || row > rows - 1) {
    return -1;
  }
  return column + row * cols;
}
class Cell {
  constructor(column, row) {
    this.column = column;
    this.row = row;
    this.visited = false;
    this.walls = [true, true, true, true]; // top right bottom  left
  }
  show() {
    let x = this.column * w;
    let y = this.row * w;
    context.strokeStyle = "#607274";
    context.lineWidth = 2;
    if (this.walls[0]) {
      line(x, y, x + w, y); // top
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); // right
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); // bottom
    }
    if (this.walls[3]) {
      line(x, y + w, x, y); // left
    }
    if (this.visited) {
      context.fillStyle = "#FF004D";
      context.strokeStyle = "#fff";
      context.fillRect(x, y, w, w);
    }
  }
  check() {
    let neighbors = [];
    let top = grid[getIndex(this.column, this.row - 1)];
    let right = grid[getIndex(this.column + 1, this.row)];
    let bottom = grid[getIndex(this.column, this.row + 1)];
    let left = grid[getIndex(this.column - 1, this.row)];
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
    if (neighbors.length > 0) {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    } else {
      return undefined;
    }
  }
  highlight() {
    let x = this.column * w;
    let y = this.row * w;
    context.fillStyle = "#294B29";
    context.fillRect(x, y, w, w);
  }
}
function createCell(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      grid.push(new Cell(y, x));
    }
  }
  current = grid[0];
}
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
function draw() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  /// STEP 1
  const next = current.check();
  current.highlight();
  if (next) {
    next.visited = true;
    /// STEP 3
    removeWalls(current, next);
    /// STEP 4
    current = next;
    setTimeout(draw, 300);
  }
}
Canvas();
draw();
