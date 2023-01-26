let points = [];
let x = 0.1;
let y = 0.1;
let z = 0.1;
let rho;
let sigma;
let beta;

let rho_slider;
let sigma_slider;
let beta_slider;

let hu = 0;

function setup() {
  createCanvas(1000, 600, WEBGL);
  colorMode(HSB);

  rho_slider = createSlider(0, 100, 28, 0.1);
  sigma_slider = createSlider(0, 100, 10, 0.1);
  beta_slider = createSlider(0, 100, 8 / 3, 0.1);
}

function draw() {
  background(0);

  let new_rho = rho_slider.value();
  let new_sigma = sigma_slider.value();
  let new_beta = beta_slider.value();

  if (new_rho !== rho || new_sigma !== sigma || new_beta !== beta) {
    points = [];
    rho = new_rho;
    sigma = new_sigma;
    beta = new_beta;
  }

  let dt = 0.01;
  dx = sigma * (y - x) * dt;
  dy = (x * (rho - z) - y) * dt;
  dz = (x * y - beta * z) * dt;
  x += dx;
  y += dy;
  z += dz;
  points.push(createVector(x, y, z));

  translate(0, 0, -80);
  let camX = map(mouseX, 0, width, -1000, 1000);
  let camY = map(mouseY, 0, height, -1000, 1000);
  camera(
    camX,
    camY,
    height / (2.0 * tan((PI * 30.0) / 180.0)),
    0,
    0,
    0,
    0,
    1,
    0
  );

  scale(5);

  noFill();
  beginShape();
  stroke(hu, 255, 255);
  for (let p of points) {
    vertex(p.x, p.y, p.z);
  }
  hu += 1;
  if (hu >= 255) {
    hu = 0;
  }
  endShape();
}
