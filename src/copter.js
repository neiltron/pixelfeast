import events from './events';
import * as dimensions from './dimensions';
import {images} from './assets';
import Projectiles from './projectiles';
import Projectile from './projectile';

const MOVEMENT_INCREMENT = 10;
const ROTATION_INCREMENT = 2 * Math.PI / 20;

class Copter {
  constructor() {
    this.width = dimensions.DRONE_SIZE;
    this.height = dimensions.DRONE_SIZE;


    this.center = [dimensions.VIEWPORT_WIDTH / 2 - this.width / 2, dimensions.VIEWPORT_HEIGHT / 2 - this.height / 2];
    this.position = [dimensions.VIEWPORT_WIDTH / 2 - this.width / 2, dimensions.VIEWPORT_HEIGHT / 2 - this.height / 2];
    this.rotation = 0;

    this.hasPackage = false;

    this._handleKeyDown = this._handleKeyDown.bind(this);

    this._bind();
  }

  update() {}

  draw(ctx) {
    const scale = dimensions.getScale(ctx);
    ctx.save();
    ctx.translate(
      Math.floor(this.position[0] * scale),
      Math.floor(this.position[1] * scale)
    );
    ctx.rotate(this.rotation);

    ctx.drawImage(
      images.drone,
      -dimensions.DRONE_SIZE / 2,
      -dimensions.DRONE_SIZE / 2,
      dimensions.DRONE_SIZE,
      dimensions.DRONE_SIZE
    );

    ctx.restore();
  }

  _bind() {
    events.keyDown.add(this._handleKeyDown);
  }

  _handleKeyDown(e) {
    if      (e.key == 'a') { this.moveLeft();  }
    else if (e.key == 'd') { this.moveRight(); }
    else if (e.key == 'w') { this.moveUp();    }
    else if (e.key == 's') { this.moveDown();  }

    else if (e.key == 'ArrowLeft') { this.rotate(-1); }
    else if (e.key == 'ArrowRight') { this.rotate(1); }

    else if (e.code == 'Space') {
      this.shoot();
    }
  }

  moveLeft() {
    this.position[0] -= MOVEMENT_INCREMENT;
  }

  moveRight() {
    this.position[0] += MOVEMENT_INCREMENT;
  }

  moveUp() {
    this.position[1] -= MOVEMENT_INCREMENT;
  }

  moveDown() {
    this.position[1] += MOVEMENT_INCREMENT;
  }

  // direction is 1 or -1 for right/left
  rotate(direction) {
    this.rotation += ROTATION_INCREMENT * direction;
  }

  shoot() {
    Projectiles.push(new Projectile({
      direction: this.rotation,
      position: this.position.slice(),
    }));
  }
}

export default new Copter();
