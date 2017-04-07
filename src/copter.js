import events from './events';
import * as dimensions from './dimensions';
import {images} from './assets';
import Projectiles from './projectiles';
import Projectile from './projectile';
import { clamp } from './utils';

class Copter {
  constructor(opts) {
    opts = opts || {};

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
    this.position = opts.position || [dimensions.VIEWPORT_WIDTH / 2 - this.width / 2, dimensions.VIEWPORT_HEIGHT / 2 - this.height / 2];
    this.rotation = 0;

    this.hasPackage = false;
  }

  update(delta) {
    this.velocityX += this.acceleratorX * delta;
    this.velocityY += this.acceleratorY * delta;

    this.velocityX = clamp(this.velocityX, -1, 1);
    this.velocityY = clamp(this.velocityY, -1, 1);

    this.position[0] += this.velocityX * delta;
    this.position[1] += this.velocityY * delta;

    if ((this.leftDown || this.rightDown) && this.leftDown !== this.rightDown) {
      this.rotation += 0.005 * delta * (this.leftDown ? -1 : 1)
    }

    // temporary "explosion" visual is scaling down to 0
    if (this.isExploding) {
      this.scale -= .05;
    }
  }

  draw(ctx, delta) {
    this.update(delta);

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
    }));
  }

  explode() {
    this.isExploding = true;
  }
}

export default Copter;
