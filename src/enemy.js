import Copter from './copter';
import {images} from './assets';
import * as dimensions from './dimensions';
import Player from './player';

class Enemy extends Copter {
  drawSprite(ctx) {
    ctx.drawImage(
      images.drone_enemy,
      -dimensions.DRONE_SIZE / 2,
      -dimensions.DRONE_SIZE / 2,
      dimensions.DRONE_SIZE * this.scale, // temporary "explosion" visual is scaling down to 0
      dimensions.DRONE_SIZE * this.scale
    );

    if (this.explosionFrame > 0) {
      ctx.drawImage(
        images.explosion,
        Math.floor(Math.floor(this.explosionFrame) / 5) * 64,
        (Math.floor(this.explosionFrame) % 5) * 64,
        64, 64,
        -dimensions.DRONE_SIZE / 2,
        -dimensions.DRONE_SIZE / 2,
        dimensions.DRONE_SIZE,
        dimensions.DRONE_SIZE
      );
    }
  }

  _update(delta) {
    // fire at random
    if (this.distanceFrom(Player) < dimensions.VIEWPORT_WIDTH / 1.1 && Math.random() > .98) {
      this.shoot();
    }

    this.acceleratorX = (Math.random() - Math.random()) / 5000;
    this.acceleratorY = (Math.random() - Math.random()) / 5000;

    this.rotation = Math.atan2(Player.position[1] - this.position[1], Player.position[0] - this.position[0]) + Math.PI / 2;
  }
}

export default Enemy;