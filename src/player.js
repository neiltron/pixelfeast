import events from './events';
import Copter from './copter';

class Player extends Copter {
  constructor() {
    super();

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);

    this._bind();
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

  _handleKeyUp(e) {
    if      (e.key == 'a' || e.key == 'd') { this.stopHorizontalMovement(); }
    else if (e.key == 'w' || e.key == 's') { this.stopVerticalMovement(); }
  }

  _bind() {
    events.keyDown.add(this._handleKeyDown);
    events.keyUp.add(this._handleKeyUp);
  }
}

export default new Player();