import Tiles from './src/tiles';
import * as dimensions from './src/dimensions';
import Copter from './src/copter';
import Player from './src/player';
import Enemy from './src/enemy';
import Camera from './src/camera';
import events from './src/events';
import {loadImages, images} from './src/assets';
import Projectiles from './src/projectiles';

let canvas = document.querySelector('canvas');
canvas.width = 512;
canvas.height = 512;

let ctx = canvas.getContext('2d');

let lastUpdate = Date.now();

const enemies = [];

function draw() {
  const delta = Date.now() - lastUpdate;

  lastUpdate = Date.now();

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = dimensions.getScale(ctx);
  ctx.scale(scale, scale);

  Camera.translate(ctx)

  Tiles.draw(ctx);

  if (Projectiles.length > 0 && enemies.length > 0) {

    Projectiles.forEach((projectile, index) => {
      for (var i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        if (projectile.detectCollision(enemy)) {
          enemy.explode();

          Projectiles.splice(index, 1);

          break;
        }
      }
    })
  }

  Projectiles.forEach(projectile => {
    projectile.update();
    projectile.draw(ctx);
  });

  enemies.forEach((enemy, index) => {
    if (enemy.scale < .4) {
      enemies.splice(index, 1);
    } else {
      enemy.draw(ctx, delta);
    }
  });

  Player.draw(ctx, delta);

  ctx.restore();

  requestAnimationFrame(draw);
}

function createEnemies() {
  for (var i = 0; i < 4; i += 1) {
    enemies.push(new Enemy({
      position: [Math.random() * dimensions.VIEWPORT_WIDTH, Math.random() * dimensions.VIEWPORT_HEIGHT]
    }));
  }
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
window.addEventListener('keyup', e => { events.keyUp.dispatch(e); });


loadImages().then(draw).then(createEnemies);
