let cols,
  rows,
  w = 80,
  grid = [],
  context = "";

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
function createCell(rows, cols) {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let cell = new Cell(y, x);
      grid.push(cell);
    }
  }
}
function Cell(column, row) {
  this.column = column;
  this.row = row;
  this.show = function () {
    let x = this.column * w;
    let y = this.row * w;
    context.strokeStyle = "#607274";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x,     y    );
    context.lineTo(x + w, y    );
    context.lineTo(x + w, y + w);
    context.lineTo(x,     y + w);
    context.lineTo(x,     y    );
    context.stroke();
  };
}
function draw() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

Canvas();
draw();
