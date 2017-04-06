import events from './events';
import * as dimensions from './dimensions';
import {images} from './assets';

const MOVEMENT_INCREMENT = 10;
const ROTATION_INCREMENT = 2 * Math.PI / 20;

class Copter {
  constructor() {
    this.sprite = document.createElement('canvas');
    this.ctx = this.sprite.getContext('2d');

    this.width = dimensions.TILE_SIZE * 4;
    this.height = dimensions.TILE_SIZE * 4;

    this.sprite.width = this.sprite.style.width = this.width * 1.5;
    this.sprite.height = this.sprite.style.height = this.height * 1.5;

    this.center = [dimensions.VIEWPORT_WIDTH / 2 - this.width / 2, dimensions.VIEWPORT_HEIGHT / 2 - this.height / 2];
    this.position = [dimensions.VIEWPORT_WIDTH / 2 - this.width / 2, dimensions.VIEWPORT_HEIGHT / 2 - this.height / 2];
    this.rotation = 0;

    this.hasPackage = false;

    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, this.sprite.width, this.sprite.height);

    events.imagesLoaded.once(() => {
    this.image = images.drone;

      this.ctx.drawImage(
        this.image,
        (this.sprite.width - this.width) / 2,
        (this.sprite.height - this.height) / 2,
        this.width,
        this.height
      );
    });

    this.ctx.save();
    this.ctx.rotate(this.rotation * (180 / Math.PI));
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(this.sprite.width / 2, (this.sprite.width - this.width) / 2);
    this.ctx.lineTo(this.sprite.width / 2, this.sprite.height / 2);
    this.ctx.stroke();
    this.ctx.restore();

    this._handleKeyDown = this._handleKeyDown.bind(this);

    this._bind();
  }

  update() {}

  draw(ctx) {
    const scale = dimensions.getScale(ctx);
    ctx.drawImage(this.sprite, Math.floor(this.position[0] * scale), Math.floor(this.position[1] * scale), this.sprite.width * scale, this.sprite.height * scale);
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

    this.ctx.clearRect(0, 0, this.sprite.width, this.sprite.height);

    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, this.sprite.width, this.sprite.height);

    this.ctx.save();
    this.ctx.translate(this.sprite.width / 2, this.sprite.height / 2);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(this.sprite.width / -2, this.sprite.height / -2);

    this.ctx.drawImage(
      this.image,
      (this.sprite.width - this.width) / 2,
      (this.sprite.height - this.height) / 2,
      this.width,
      this.height
    );

    // this.ctx.strokeStyle = '#fff';
    // this.ctx.moveTo(this.sprite.width / 2, (this.sprite.height - this.height) / 2);
    // this.ctx.lineTo(this.sprite.width / 2, this.sprite.height / 2);
    // this.ctx.stroke();

    this.ctx.restore();
  }
}

export default new Copter();
