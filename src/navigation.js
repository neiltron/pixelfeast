import Camera from './camera';
import Player from './player';
import {targetLocation} from './tiles';
import {images} from './assets';

const SPRITES = {
  NORTH: [0, 0],
  SOUTH: [1, 0],
  EAST: [0, 1],
  WEST: [1, 1]
};

const drawSprite = (ctx, sprite, x, y, w, h) => {
  if (Date.now() % 1000 < 500) { // Blink
    return;
  }

  ctx.drawImage(images.navigation, sprite[0] * 16, sprite[1] * 16, 16, 16, x, y, w, h);
};

export default {
  draw(ctx) {
    const bounds = Camera.getBounds();
    let targetInView = true;

    if (targetLocation.x < bounds.x || targetLocation.x > bounds.x + bounds.w) {
      targetInView = false;
    }

    if (targetLocation.y < bounds.y || targetLocation.y > bounds.y + bounds.h) {
      targetInView = false;
    }

    ctx.fillStyle = '#f00';

    if (targetInView) {
      drawSprite(ctx, SPRITES.SOUTH, targetLocation.x - 32, targetLocation.y - 32, 64, 64);
    } else {
      let x = targetLocation.x;
      let y = targetLocation.y;
      let sprite = SPRITES.SOUTH;

      if (x < bounds.x) {
        x = bounds.x;
        sprite = SPRITES.EAST;
      } else if (x > bounds.x + bounds.w) {
        x = bounds.x + bounds.w - 64;
        sprite = SPRITES.WEST;
      }

      if (y < bounds.y) {
        y = bounds.y;
        sprite = SPRITES.NORTH;
      } else if (y > bounds.y + bounds.h) {
        sprite = SPRITES.SOUTH;
        y = bounds.y + bounds.h - 64;
      }

      drawSprite(ctx, sprite, x, y, 64, 64);
    }
  }
};
