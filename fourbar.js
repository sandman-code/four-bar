/* Linkage Types

1 - Triple Rocker * Not done
2 - Crank Rocker * Done
3 - Double Crank * Done
4 - Double Rocker * Not done
*/

// Crank Link
var a = 0;

// Coupler Link
var b = 0;

// Follower Link
var c = 0;

// Base Link
var d = 0;

var outputPoints = [];

// vector loop
// r2 + r3 - r4 - r1 = 0
var Q;
var A;
var B;
var C;
var D;
var E;
var F;
var theta4 = 0;
var theta3 = 0;
var theta2 = 0;

var isAnimating = false;

var k1 = d / a;
var k2 = d / c;
var k3 = (a * a - b * b + c * c + d * d) / (2 * a * c);
var k4 = d / b;
var k5 = (c * c - d * d - a * a - b * b) / (2 * a * b);

function proj_method() {
  var A_proj = b * b + c * c;
  var B_proj = 2 * b * c;
  let r = d - a * Math.cos(theta2);
  let s = a * Math.sin(theta2);
  let f2 = r * r + s * s;
  let sigma = Math.acos((A_proj - f2) / B_proj);
  let g = b - c * Math.cos(sigma);
  let h = c * Math.sin(sigma);
  console.log(h, r, g, s);
  theta3 = Math.atan2(h * r - g * s, g * r + h * s);
  theta4 = theta3 + sigma;
}

function drawCanvas() {
  let bh = 1000;
  let bw = 1000;
  let p = 0;
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  for (var x = 0; x <= bw; x += 20) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += 20) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }
  context.strokeStyle = "#D3D3D3";
  context.stroke();
}

function init() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas();
}

function renderLinks() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  // Crank Link
  a = document.getElementById("a").value;

  // Coupler Link
  b = document.getElementById("b").value;

  // Follower Link
  c = document.getElementById("c").value;

  // Base Link
  d = document.getElementById("d").value;

  proj_method();

  let x1 = 0;
  let y1 = 0;
  let x2 = a * Math.cos(theta2);
  let y2 = a * Math.sin(theta2);
  let x3 = x2 + b * Math.cos(theta3);
  let y3 = y2 + b * Math.sin(theta3);
  let x4 = d + c * Math.cos(theta4);
  let y4 = c * Math.sin(theta4);

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas();
  // Move the origin to the middle of the canvas
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  ctx.translate(centerX, centerY);

  // Draw the links
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.lineTo(d, 0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  // Draw crank path
  ctx.beginPath();
  ctx.arc(x1, y1, a, 0, 2 * Math.PI);
  ctx.strokeStyle = "red";
  ctx.stroke();
  // Draw the joints
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(d, 0, 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x3, y3, 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x4, y4, 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (isAnimating) {
    theta2 += 0.01;
    requestAnimationFrame(renderLinks);
  }
}

function run() {
  isAnimating = !isAnimating;
  renderLinks();
}
