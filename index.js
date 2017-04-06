import Tiles from './src/tiles';

let canvas = document.querySelector('canvas');
canvas.width = 512;
canvas.height = 512;

let ctx = canvas.getContext('2d');

function draw() {
  ctx.save();
  Tiles.draw(ctx);
  ctx.restore();
}

Tiles.generate();
draw();

const resize = () => {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
  draw();
};

resize();

window.addEventListener('resize', resize);
