let cols,
  rows,
  w = 80,
  grid = [],
  context = "",
  show = null;
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
class Cell {
  constructor(column, row) {
    this.column = column;
    this.row = row;
  }
  show() {
    const walls = [true, true, true, true]; // top right left  bottom
    let x = this.column * w;
    let y = this.row * w;
    context.strokeStyle = "#607274";
    context.lineWidth = 2;
    if (walls[0]) {
      line(x, y, x + w, y);
    }
    if (walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (walls[3]) {
      line(x, y + w, x, y);
    }
  }
}
function createCell(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      grid.push(new Cell(y, x));
    }
  }
}
//
function draw() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

Canvas();
draw();
