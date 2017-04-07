import events from './events';
import Player from './player';
import * as dimensions from './dimensions';
import {rand} from './utils';

let x = 0;
let y = 0;

let shakeX = 0;
let shakeY = 0;

const updateShake = endTime => {
  if (Date.now() > endTime) {
    shakeX = 0;
    shakeY = 0;
    return;
  }

  shakeX = rand(-20, 20);
  shakeY = rand(-20, 20);
  setTimeout(() => updateShake(endTime), 25);
};

events.explode.add(() => updateShake(Date.now() + 200));

export default {
  translate(ctx) {
    x = shakeX + Math.max(0, Math.min(dimensions.GRID_WIDTH * dimensions.TILE_SIZE - dimensions.VIEWPORT_WIDTH, Player.position[0] - Math.floor(dimensions.VIEWPORT_WIDTH / 2)));
    y = shakeY + Math.max(0, Math.min(dimensions.GRID_HEIGHT * dimensions.TILE_SIZE - dimensions.VIEWPORT_HEIGHT, Player.position[1] - Math.floor(dimensions.VIEWPORT_HEIGHT / 2)));

    ctx.translate(-Math.floor(x), -Math.floor(y));
  },

  getBounds() {
    return { x, y, w: dimensions.VIEWPORT_WIDTH, h: dimensions.VIEWPORT_HEIGHT };
  },
};
