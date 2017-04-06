import Tiles from './src/tiles';
import Copter from './src/copter';
import Camera from './src/camera';
import events from './src/events';
import {loadImages} from './src/assets';
import Projectiles from './src/projectiles';

let canvas = document.querySelector('canvas');
canvas.width = 512;
canvas.height = 512;

let ctx = canvas.getContext('2d');

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  Camera.translate(ctx)

  Tiles.draw(ctx);

  Projectiles.forEach(projectile => {
    projectile.update();
    projectile.draw(ctx);
  });


  Copter.draw(ctx);

  ctx.restore();

  requestAnimationFrame(draw);
}

Tiles.generate();

const resize = () => {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
};

resize();

window.addEventListener('resize', resize);
window.addEventListener('keydown', e => { events.keyDown.dispatch(e); });


loadImages().then(draw);
