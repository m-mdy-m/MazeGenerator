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
class Cell {
  constructor(column, row) {
    this.column = column;
    this.row = row;
    this.visited = false;
  }
  show() {
    const walls = [true, true, true, true]; // top right bottom  left
    let x = this.column * w;
    let y = this.row * w;
    context.strokeStyle = "#607274";
    context.lineWidth = 2;
    if (walls[0]) {
      line(x, y, x + w, y); // top
    }
    if (walls[1]) {
      line(x + w, y, x + w, y + w); // right
    }
    if (walls[2]) {
      line(x + w, y + w, x, y + w); // bottom
    }
    if (walls[3]) {
      line(x, y + w, x, y); // left
    }
    if (this.visited) {
      context.fillStyle = "#FF004D";
      context.strokeStyle = "#fff";
      context.fillRect(x, y, w, w);
      context.strokeRect(x, y, w, w);
    }
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
function draw() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
}
function animate() {
  draw();
  requestAnimationFrame(animate);
}

Canvas();
animate();
