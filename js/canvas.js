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

class Cell {
  constructor(column, row) {
    this.column = column;
    this.row = row;
  }
  show() {
    const walls = [true, true, true, true]; // top right left left bottom
    let x = this.column * w;
    let y = this.row * w;
    context.strokeStyle = "#607274";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x, y);
    if (walls[0]) {
      context.lineTo(x, y); // left
    }
    if (walls[1]) {
      context.lineTo(x + w, y); // top
    }
    if (walls[2]) {
      context.lineTo(x + w, y + w); // right
    }
    if (walls[3]) {
      context.lineTo(x, y + w); // bottom
    }
    context.stroke();
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
