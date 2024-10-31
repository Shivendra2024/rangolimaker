// script.js
const canvas = document.getElementById("rangoliCanvas");
const ctx = canvas.getContext("2d");
let colorPicker = document.getElementById("colorPicker");

let shapes = []; // Store all shapes on the canvas

// Shape base class
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  draw() {}
}

// Circle shape
class Circle extends Shape {
  constructor(x, y, color) {
    super(x, y, color);
    this.radius = 30;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Square shape
class Square extends Shape {
  constructor(x, y, color) {
    super(x, y, color);
    this.size = 50;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}

// Pattern (Example: simple star)
class Pattern extends Shape {
  constructor(x, y, color) {
    super(x, y, color);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - 20);
    for (let i = 1; i < 5; i++) {
      const angle = (i * 144 * Math.PI) / 180;
      ctx.lineTo(this.x + Math.cos(angle) * 20, this.y - Math.sin(angle) * 20);
    }
    ctx.closePath();
    ctx.fill();
  }
}

// Add a new shape based on type
function addShape(type) {
  const color = colorPicker.value;
  const x = Math.random() * (canvas.width - 100) + 50;
  const y = Math.random() * (canvas.height - 100) + 50;
  let shape;
  
  if (type === "circle") shape = new Circle(x, y, color);
  else if (type === "square") shape = new Square(x, y, color);
  else if (type === "pattern") shape = new Pattern(x, y, color);
  
  shapes.push(shape);
  drawCanvas();
}

// Draw all shapes
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => shape.draw());
}

// Drag and Drop
let isDragging = false;
let selectedShape;

canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  selectedShape = shapes.find(
    (shape) =>
      mouseX >= shape.x - 30 &&
      mouseX <= shape.x + 30 &&
      mouseY >= shape.y - 30 &&
      mouseY <= shape.y + 30
  );

  if (selectedShape) isDragging = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging && selectedShape) {
    selectedShape.x = e.offsetX;
    selectedShape.y = e.offsetY;
    drawCanvas();
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

// Save design as an image
function saveDesign() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "rangoli_design.png";
  link.click();
}
