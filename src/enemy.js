import Copter from './copter';
import {images} from './assets';
import * as dimensions from './dimensions';

class Enemy extends Copter {
  drawSprite(ctx) {
    ctx.drawImage(
      images.drone_enemy,
      -dimensions.DRONE_SIZE / 2,
      -dimensions.DRONE_SIZE / 2,
      dimensions.DRONE_SIZE,
      dimensions.DRONE_SIZE
    );
  }
}

export default Enemy;