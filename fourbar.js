// Crank Link
var a = 100;

// Coupler Link
var b = 350;

// Follower Link
var c = 200;

// Base Link
var d = 150;

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
var theta4;
var theta3;
var theta2 = 0;

var k1 = d / a;
var k2 = d / c;
var k3 = (a * a - b * b + c * c + d * d) / (2 * a * c);
var k4 = d / b;
var k5 = (c * c - d * d - a * a - b * b) / (2 * a * b);

const A_proj = b * b + c * c;
const B_proj = 2 * b * c;

function proj_method() {
  let r = d - a * Math.cos(theta2);
  let s = a * Math.sin(theta2);
  let f2 = r * r + s * s;
  let sigma = Math.acos((A_proj - f2) / B_proj);
  let g = b - c * Math.cos(sigma);
  let h = c * Math.sin(sigma);
  theta3 = Math.atan2(h * r - g * s, g * r + h * s);
  theta4 = theta3 + sigma;
}

function run() {
  /*
  for (let i = 0; i < Math.PI / 2; i++) {
    theta2 += 0.01;
    Q = Math.cos(theta2);
    A = k3 - k1 - (k2 - 1) * Q;
    B = -2 * Math.sin(theta2);
    C = k3 + k1 - (k2 + 1) * Q;
    D = k5 - k1 + (k4 + 1) * Q;
    E = B;
    F = k5 + k1 + (k4 - 1) * Q;
    theta4 = 2 * Math.atan2(-B - Math.sqrt(B * B - 4 * A * C), 2 * A);
    theta3 = 2 * Math.atan2(-E - Math.sqrt(E * E - 4 * D * F), 2 * D);
    let x4 = d + c * Math.cos(theta4);
    let y4 = c * Math.sin(theta4);

    outputPoints.push([x4, y4]);
  }
*/
  theta2 += 0.01;

  proj_method();

  let x1 = 0;
  let y1 = 0;
  let x2 = a * Math.cos(theta2);
  let y2 = a * Math.sin(theta2);
  let x3 = x2 + b * Math.cos(theta3);
  let y3 = y2 + b * Math.sin(theta3);
  let x4 = d + c * Math.cos(theta4);
  let y4 = c * Math.sin(theta4);
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  outputPoints = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(run);

  console.log(theta4);
}

//run();
