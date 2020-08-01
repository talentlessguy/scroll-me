let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

const s = 10;
const m = 8;
const h = 0.1;

function setup() {
  createCanvas(720, 400);
  stroke(255);

  radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  //background(230);
  // Draw the clock background

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top

  const s = 10;
  //console.log(s);
  const m = 8;
  const h = 0.1;

  // Clock lines
  /*stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);*/

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}

function mouseDragged() {
  dragSegment(0, mouseX, mouseY);
  for (let i = 0; i < x.length - 1; i++) {
    dragSegment(i + 1, x[i], y[i]);
  }
}

function dragSegment(i, xin, yin) {
  background(0, 0, 0);
  dx = mouseX - cx;
  dy = mouseY - cy;
  angle1 = atan2(dy, dx);

  tx = mouseX - cos(angle1) * hoursRadius;
  ty = mouseY - sin(angle1) * hoursRadius;
  dx = tx - cx;
  dy = ty - cy;
  angle2 = atan2(dy, dx);
  x = cx + cos(angle2) * hoursRadius;
  y = cy + sin(angle2) * hoursRadius;

  segment(x, y, angle1);
  segment(cx, cy, angle2);
}

function segment(x, y, a) {
  noStroke();
  fill(0, 0, 0);
  ellipse(cx + 2, cy + 2, clockDiameter + 20, clockDiameter + 20);
  //fill(200, 200, 200);
  //ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(255, 0, 0);
  ellipse(cx, cy, clockDiameter, clockDiameter);
  push();
  fill(0, 0, 200);
  translate(x, y);
  rotate(a);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  pop();
}
