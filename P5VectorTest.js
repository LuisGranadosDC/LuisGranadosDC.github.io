let loc;
let veloc;
let ballSize = 60;

function setup() {
  createCanvas(600,600);
  fill(180,40,40);
  loc = createVector(400, 300);
  veloc = createVector(2,2);
}


function draw() {
  background(40,40,240);
  ellipse(loc.x, loc.y, ballSize, ballSize);
  loc.add(veloc);
  if(loc.x > width || loc.x <0) {
    veloc.x *= -1;
  }
  if(loc.y > height || loc.y <0) {
    veloc.y *= -1;
  }
  veloc.x += random(-0.5,0.5);
  veloc.y += random(-0.5,0.5);
}
