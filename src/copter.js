import events from './events';
import * as dimensions from './dimensions';
import {images} from './assets';
import Projectiles from './projectiles';
import Projectile from './projectile';
import { clamp } from './utils';

class Copter {
  constructor(opts) {
    opts = opts || {};

    this.id = Math.floor(Math.random() * 10000);

    this.width = dimensions.DRONE_SIZE;
    this.height = dimensions.DRONE_SIZE;
    this.scale = 1; // temporary "explosion" visual is scaling down to 0

    this.velocityX = 0;
    this.velocityY = 0;

    this.acceleratorX = 0;
    this.acceleratorY = 0;

    this.leftDown = false;
    this.rightDown = false;

    this.center = [dimensions.VIEWPORT_WIDTH / 2 - this.width / 2, dimensions.VIEWPORT_HEIGHT / 2 - this.height / 2];
    this.position = opts.position || [dimensions.MAP_PIXEL_WIDTH / 2 - this.width / 2, dimensions.MAP_PIXEL_HEIGHT / 2 - this.height / 2];
    this.rotation = 0;

    this.hasPackage = false;
    this.explosionFrame = -1;
    this.isActive = true;
  }

  update(delta) {
    if (typeof this._update === 'function') { this._update(delta); }

    this.velocityX += this.acceleratorX * delta;
    this.velocityY += this.acceleratorY * delta;

    this.velocityX = clamp(this.velocityX, -1, 1);
    this.velocityY = clamp(this.velocityY, -1, 1);

    // check oob after setting velocity/accelerator so we can correct
    // course if copter is off screen
    this.checkOOB();

    this.position[0] += this.velocityX * delta;
    this.position[1] += this.velocityY * delta;

    if ((this.leftDown || this.rightDown) && this.leftDown !== this.rightDown) {
      this.rotation += 0.005 * delta * (this.leftDown ? -1 : 1)
    }

    // temporary "explosion" visual is scaling down to 0
    if (this.explosionFrame > 0) {
      this.scale -= .01;

      if (this.scale <= 0) {
        this.isActive = false;
        this.scale = 0;
        this.explosionFrame = -1;
        this.acceleratorX = this.acceleratorY = this.velocityX = this.velocityY = 0;
      }
    }
  }

  draw(ctx, delta) {
    this.update(delta);

    if (this.explosionFrame >= 0) {
      this.explosionFrame += .1;
    }

    ctx.save();
    ctx.translate(
      Math.floor(this.position[0]),
      Math.floor(this.position[1])
    );
    ctx.rotate(this.rotation);

    this.drawSprite(ctx);

    ctx.restore();
  }

  drawSprite(ctx) {
    ctx.drawImage(
      images.drone,
      Math.floor(-dimensions.DRONE_SIZE / 2),
      Math.floor(-dimensions.DRONE_SIZE / 2),
      // temporary "explosion" visual is scaling down to 0
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

  moveLeft() {
    this.acceleratorX = -.002;
  }

  moveRight() {
    this.acceleratorX = .002;
  }

  moveUp() {
    this.acceleratorY = -.002;
  }

  moveDown() {
    this.acceleratorY = .002;
  }

  stopHorizontalMovement() {
    this.acceleratorX = 0;
  }

  stopVerticalMovement() {
    this.acceleratorY = 0;
  }

  shoot() {
    Projectiles.push(new Projectile({
      direction: this.rotation,
      position: this.position.slice(),
      playerID: this.id
    }));
  }

  explode() {
    this.explosionFrame = 0;

    events.explode.dispatch();
  }

  checkOOB() {
    if (this.position[0] < 0) {
      this.position[0] = 1;
      this.velocityX = .05;
      this.acceleratorX = .000005;
    } else if (this.position[0] > dimensions.MAP_PIXEL_WIDTH) {
      this.position[0] = dimensions.GRID_WIDTH * dimensions.TILE_SIZE;
      this.velocityX = -.05;
      this.acceleratorX = -.000005;
    } else if (this.position[1] < 0) {
      this.position[1] = 1;
      this.velocityY = .05;
      this.acceleratorY = .000005;
    } else if (this.position[1] > dimensions.MAP_PIXEL_HEIGHT) {
      this.position[1] = dimensions.GRID_HEIGHT * dimensions.TILE_SIZE;
      this.velocityY = -.05;
      this.acceleratorY = -.000005;
    }
  }

  distanceFrom(obj) {
    const dx = obj.position[0] - this.position[0];
    const dy = obj.position[1] - this.position[1];

    return Math.sqrt( dx * dx + dy * dy );
  }
}

export default Copter;
