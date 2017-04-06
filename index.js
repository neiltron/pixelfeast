import Tiles from './src/tiles';
import Copter from './src/copter';
import events from './src/events';

let canvas = document.querySelector('canvas');
canvas.width = 512;
canvas.height = 512;

let ctx = canvas.getContext('2d');

function draw() {
  Tiles.draw(ctx);
  Copter.draw(ctx);

  requestAnimationFrame(draw);
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
window.addEventListener('keydown', e => { events.keyDown.dispatch(e); });
