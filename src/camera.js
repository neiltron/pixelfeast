import events from './events';
import Copter from './copter';
import * as dimensions from './dimensions';

let x = 0;
let y = 0;

events.keyDown.add(e => {
  x = Math.max(0, Math.min(dimensions.VIEWPORT_WIDTH, Copter.position[0] - Math.floor(dimensions.VIEWPORT_WIDTH / 2)));
  y = Math.max(0, Math.min(dimensions.VIEWPORT_HEIGHT, Copter.position[1] - Math.floor(dimensions.VIEWPORT_HEIGHT / 2)));
});


export default {
  translate(ctx) {
    const scale = dimensions.getScale(ctx);
    ctx.translate(-x * scale, -y * scale);
  },

  getPosition() {
    return { x, y };
  },
};
