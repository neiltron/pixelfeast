import Player from './player';
import * as dimensions from './dimensions';
import {images} from './assets';
import Camera from './camera';

export default (ctx) => {
  const bounds = Camera.getBounds();

  for (var i = 0; i < 4 - Player.hits; i += 1) {
    ctx.drawImage(images.healthhud_drone, bounds.x + 10 + (i * (32 + 10)), bounds.y + bounds.h - 42, 32, 32);
  }
}