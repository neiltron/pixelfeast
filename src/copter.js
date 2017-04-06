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

    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, this.sprite.width, this.sprite.height);

    events.imagesLoaded.once(() => {
    this.image = images.drone;

      // ctx.drawImage(
      //   this.image,
      //   this.width / 2,
      //   this.height / 2,
      //   this.width,
      //   this.height
      // );
    });

    // ctx.save();
    // ctx.rotate(this.rotation * (180 / Math.PI));
    // ctx.strokeStyle = '#fff';
    // ctx.moveTo(this.sprite.width / 2, (this.sprite.width - this.width) / 2);
    // ctx.lineTo(this.sprite.width / 2, this.sprite.height / 2);
    // ctx.stroke();
    // ctx.restore();

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
    console.log(direction, this.rotation);

    this.rotation += ROTATION_INCREMENT * direction;
  }

  shoot() {
    console.log(Projectiles.length)

    Projectiles.push(new Projectile({
      direction: this.rotation,
      position: [this.position[0] + (dimensions.DRONE_SIZE / 1.5), this.position[1] + (dimensions.DRONE_SIZE / 1.5)]
    }));
  }
}

export default new Copter();
