import events from './events';
import * as dimensions from './dimensions';

const MOVEMENT_INCREMENT = 10;

class Copter {
  constructor() {
    this.sprite = document.createElement('canvas');
    this.ctx = this.sprite.getContext('2d');

    this.width = this.sprite.width = this.sprite.style.width = 64;
    this.height = this.sprite.height = this.sprite.style.height = 64;

    this.center = [512 / 2 - this.width / 2, 512 / 2 - this.height / 2];
    this.position = [512 / 2 - this.width / 2, 512 / 2 - this.height / 2];

    this.hasPackage = false;

    this.ctx.fillStyle = '#f0f';
    this.ctx.fillRect(0, 0, this.sprite.width, this.sprite.height);

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
    if      (e.key == 'a' || e.key == 'ArrowLeft' ) { this.moveLeft();  }
    else if (e.key == 'd' || e.key == 'ArrowRight') { this.moveRight(); }
    else if (e.key == 'w' || e.key == 'ArrowUp'   ) { this.moveUp();    }
    else if (e.key == 's' || e.key == 'ArrowDown' ) { this.moveDown();  }
  }

  moveLeft() {
    if (this.position[0] <= 0) { return; }

    this.position[0] -= MOVEMENT_INCREMENT;
  }

  moveRight() {
    if (this.position[0] >= 512 - this.width) { return; }

    this.position[0] += MOVEMENT_INCREMENT;
  }

  moveUp() {
    if (this.position[1] <= 0) { return; }

    this.position[1] -= MOVEMENT_INCREMENT;
  }

  moveDown() {
    if (this.position[0] >= 512 - this.height) { return; }

    this.position[1] += MOVEMENT_INCREMENT;
  }
}

export default new Copter();