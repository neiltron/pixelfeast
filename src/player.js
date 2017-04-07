import events from './events';
import Copter from './copter';
import Tiles, { targetLocation } from './tiles';

class Player extends Copter {
  constructor() {
    super();

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);

    this._bind();

    this.hits = 0;
    this.hasPackage = true;
    this.isDroppingPackage = false;
  }

  reset() {
    this.hasPackage = true;
    this.isDroppingPackage = false;
    this.position = this.center;

    Tiles.setTarget();
  }

  _handleKeyDown(e) {
    if (!this.isActive || this.isDroppingPackage) { return; }

    if      (e.key == 'a') { this.moveLeft();  }
    else if (e.key == 'd') { this.moveRight(); }
    else if (e.key == 'w') { this.moveUp();    }
    else if (e.key == 's') { this.moveDown();  }

    else if (e.key == 'ArrowLeft') { this.leftDown = true; }
    else if (e.key == 'ArrowRight') { this.rightDown = true; }

    else if (e.code == 'Space') { this.shoot(); }

    else if (e.key == 'Enter') {
      if (this.isInDropzone()) {
        this.dropPackage();
      } else {
        console.log('Not in package drop zone')
      }
    }
  }

  _handleKeyUp(e) {
    if (!this.isActive || this.isDroppingPackage) { return; }

    if      (e.key == 'a' || e.key == 'd') { this.stopHorizontalMovement(); }
    else if (e.key == 'w' || e.key == 's') { this.stopVerticalMovement(); }

    else if (e.key == 'ArrowLeft') { this.leftDown = false; }
    else if (e.key == 'ArrowRight') { this.rightDown = false; }
  }

  _bind() {
    events.keyDown.add(this._handleKeyDown);
    events.keyUp.add(this._handleKeyUp);
  }

  _update() {
    if (this.isDroppingPackage) {
      this.packageHeight += .1;

      if (this.packageHeight >= 30) {
        console.log('package delivered');
        this.hasPackage = false;
        this.isDroppingPackage = false;
        this.packageHeight = 0;

        events.reset.dispatch();
      }
    }
  }

  isInDropzone() {
    const dx = targetLocation.x - this.position[0];
    const dy = targetLocation.y - this.position[1];

    return Math.sqrt( dx * dx + dy * dy ) < 100;
  }

  dropPackage() {
    this.isDroppingPackage = true;
    this.rotation = 0;
    this.velocityX = this.velocityY = this.acceleratorX = this.acceleratorY = 0;
  }
}

export default new Player();
