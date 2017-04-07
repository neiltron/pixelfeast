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
  requestAnimationFrame(draw);
  const delta = Date.now() - lastUpdate;

  lastUpdate = Date.now();

  if (delta > 1000) {
    // ignore this is a huge delta, probably tab was unfocused for a while
    return;
  }

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = dimensions.getScale(ctx);
  ctx.scale(scale, scale);

  Camera.translate(ctx)

  Tiles.draw(ctx);

  if (Projectiles.length > 0 && enemies.length > 0) {
    const bounds = Camera.getBounds();

    Projectiles.forEach((projectile, index) => {
      // check for enemy collisions
      for (var i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        // drones can't kill themselves
        if (projectile.playerID == enemy.id) { continue; }

        if (
          (enemy.position[1] + enemy.height < bounds.y || enemy.position[1] > bounds.y + bounds.h)
          && (enemy.position[0] + enemy.width < bounds.x || enemy.position[0] > bounds.x + bounds.w)
          ) {
          continue;
        }

        if (projectile.detectCollision(enemy)) {
          enemy.explode();

          Projectiles.splice(index, 1);

          break;
        }
      }

      // update projectile positions
      if (Date.now() - projectile.created > 4000) {
        Projectiles.splice(index, 1);
      } else {
        projectile.update();
        projectile.draw(ctx);
      }
    })
  }

  // update enemy positions
  enemies.forEach((enemy, index) => {
    if (enemy.scale < .4) {
      enemies.splice(index, 1);
    } else {
      enemy.draw(ctx, delta);
    }
  });

  Player.draw(ctx, delta);

  ctx.restore();
}

function createEnemies() {
  for (var i = 0; i < 10; i += 1) {
    enemies.push(new Enemy({
      position: [Math.random() * dimensions.MAP_PIXEL_WIDTH, Math.random() * dimensions.MAP_PIXEL_HEIGHT]
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
