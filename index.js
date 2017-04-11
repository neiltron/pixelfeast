import Tiles, { targetLocation } from './src/tiles';
import Navigation from './src/navigation';
import * as dimensions from './src/dimensions';
import Copter from './src/copter';
import Player from './src/player';
import Enemy from './src/enemy';
import Camera from './src/camera';
import events from './src/events';
import {loadImages, images} from './src/assets';
import Projectiles from './src/projectiles';
import Healthhud from './src/healthhud';
import {clamp} from './src/utils';

let wrap = document.querySelector('#wrap');
let canvas = document.querySelector('#canvas');
let mcanvas = document.querySelector('#mcanvas');

canvas.width = 512;
canvas.height = 512;

mcanvas.width = 512;
mcanvas.height = 512;

let ctx = canvas.getContext('2d');
let mctx = mcanvas.getContext('2d');

let lastUpdate = Date.now();

let enemies = [];

function draw() {
  requestAnimationFrame(draw);
  const delta = Date.now() - lastUpdate;

  lastUpdate = Date.now();

  if (delta > 1000) {
    // ignore this is a huge delta, probably tab was unfocused for a while
    return;
  }

  ctx.save();
  mctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = dimensions.getScale(ctx);
  const mscale = dimensions.getScale(mctx);
  
  ctx.scale(scale, scale);
  mctx.scale(mscale, mscale);
  
  Camera.translate(ctx);
  Camera.translate(mctx);

  let velocity = Math.sqrt(Player.velocityX * Player.velocityX + Player.velocityY * Player.velocityY);
  
  // Adaptive motion blur
  mctx.globalAlpha = clamp(1 - Math.pow(Math.min(1, velocity), 2), 0.2, 1);
  Tiles.draw(mctx);
  
  if (Projectiles.length > 0 && enemies.length > 0) {
    const bounds = Camera.getBounds();

    Projectiles.forEach((projectile, index) => {
      if (projectile.detectCollision(Player)) {
        if (projectile.playerID != Player.id) {
          Projectiles.splice(index, 1);

          Player.hits++;

          if (Player.hits >= 4) {
            Player.explode();
          }
        }
      }

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

  Navigation.draw(ctx);

  Player.draw(ctx, delta);

  Healthhud(ctx);

  ctx.restore();
  mctx.restore();
}

function createEnemies() {
  for (var i = 0; i < 50; i += 1) {
    enemies.push(new Enemy({
      position: [Math.random() * dimensions.MAP_PIXEL_WIDTH, Math.random() * dimensions.MAP_PIXEL_HEIGHT]
      // position: [dimensions.MAP_PIXEL_WIDTH / 2 + (Math.random() * dimensions.VIEWPORT_WIDTH * 2 - dimensions.VIEWPORT_WIDTH), dimensions.MAP_PIXEL_HEIGHT / 2 + (Math.random() * dimensions.VIEWPORT_WIDTH * 2 - dimensions.VIEWPORT_WIDTH)]
    }));
  }

  for (var i = 0; i < 5; i += 1) {
    enemies.push(new Enemy({
      position: [targetLocation.x, targetLocation.y]
      // position: [dimensions.MAP_PIXEL_WIDTH / 2 + (Math.random() * dimensions.VIEWPORT_WIDTH * 2 - dimensions.VIEWPORT_WIDTH), dimensions.MAP_PIXEL_HEIGHT / 2 + (Math.random() * dimensions.VIEWPORT_WIDTH * 2 - dimensions.VIEWPORT_WIDTH)]
    }));
  }
}

function resetGame() {
  enemies = [];

  Player.reset();
  Tiles.setTarget();
  createEnemies();
}

Tiles.generate();

const resize = () => {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;
  mcanvas.width = size;
  mcanvas.height = size;
  wrap.style.width = size+"px";
  wrap.style.height = size+"px";
};

function init() {
  resize();

  events.reset.add(() => {
    resetGame();
  })

  loadImages().then(draw).then(resetGame);
}

let started = false;
window.addEventListener('resize', resize);
window.addEventListener('keydown', e => { events.keyDown.dispatch(e); });
window.addEventListener('keyup', e => {
  if (!started && e.keyCode === 32) {
    document.getElementById('intro').classList.add('hide');
    started = true;
    init();
  }
  events.keyUp.dispatch(e);
});

loadImages().then(draw).then(createEnemies);
