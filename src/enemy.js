import Copter from './copter';
import {images} from './assets';
import * as dimensions from './dimensions';
import Player from './player';
import {getAngle} from './utils';

class Enemy extends Copter {
  drawSprite(ctx) {
    ctx.drawImage(
      images.drone_enemy,
      -dimensions.DRONE_SIZE / 2,
      -dimensions.DRONE_SIZE / 2,
      dimensions.DRONE_SIZE * this.scale,
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
    const distanceFromPlayer = this.distanceFrom(Player);

    // fire at random
    if (Player.isActive && distanceFromPlayer < dimensions.VIEWPORT_WIDTH / 1.1 && Math.random() > .98) {
      this.shoot();
    }

    if (Player.isActive && distanceFromPlayer < dimensions.VIEWPORT_WIDTH) {
      this.rotation = getAngle([this.position[0], this.position[1], Player.position[0], Player.position[1]]);

      const directionX = (this.rotation < 0 && this.rotation > Math.PI / -2) || (this.rotation > Math.PI && this.rotation < Math.PI * 1.5) ? -1 : 1;
      const directionY = (this.rotation > Math.PI / -2 && this.rotation < Math.PI / 2) ? -1 : 1;

      this.acceleratorX = (Math.random() / 7500) * directionX;
      this.acceleratorY = (Math.random() / 7500) * directionY;
    } else {
      this.acceleratorX = (Math.random() - Math.random()) / 5000;
      this.acceleratorY = (Math.random() - Math.random()) / 5000;
    }
  }
}

export default Enemy;