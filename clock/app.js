let segLength = 150,
  x,
  y,
  x2,
  y2,
  radius,
  angle,
  digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

function setup() {
  createCanvas(500, 500);
  fill(0);
  noStroke();
  strokeWeight(10);
  stroke(255, 100);

  x = width / 2;
  y = height / 2;
  x2 = x;
  y2 = y;
  radius = 220;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mouseDragged() {
  //   fill(0, 0, 0);
  //   ellipse(x2, y2, radius * 1.7 + 25, radius * 1.7 + 25);
  fill(255, 0, 0);
  ellipse(x2, y2, radius * 2, radius * 2);
  textSize(30);
  strokeWeight(0);
  textStyle(BOLD);
  fill(255);
  for (i = 0; i < 12; i++) {
    v = p5.Vector.fromAngle(((i + 1) / 12.0) * TAU - HALF_PI);
    v.mult(180);
    text(digits[i], v.x + x2 - 7, v.y + y2 + 7);
  }
  dragSegment(0, mouseX, mouseY);
}

function dragSegment(i, xin, yin) {
  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);

  tx = mouseX - cos(angle1) * segLength;
  ty = mouseY - sin(angle1) * segLength;
  dx = tx - x2;
  dy = ty - y2;
  angle2 = atan2(dy, dx);
  x = x2 + cos(angle2) * segLength;
  y = y2 + sin(angle2) * segLength;

  segment(x, y, angle2);
}

function segment(x, y, a) {
  push();
  angle = a;
  translate(x, y);
  rotate(a);
  fill(255, 255, 255);
  strokeWeight(20);
  line(0, 0, -segLength, 0);
  strokeWeight(0);
  checkDigit();
  pop();
}

function checkDigit() {
  let indx = ((angle + Math.PI) / (Math.PI * 2)) * 12 + 8;
  const join = document.createElement("button");
  join.id = "join";
  join.innerText = "Принять участие";
  join.onclick = () => visit("windows_tubes");
  if (digits[Math.round(indx % 12)] == hour() % 12) {
    if (document.getElementById("join") == null) {
      document.body.appendChild(join);
    }
    //visit("windows_tubes");
  } else {
    if (document.getElementById("join") != null) {
      document.getElementById("join").remove();
    }
  }
}
