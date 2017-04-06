import * as dimensions from './dimensions';

export default class Projectile {
  constructor(opts) {
    this.direction = opts.direction;
    this.velocity = 4;

    this.position = opts.position;

    this.width = 48 / 6;
    this.height = 164 / 6;

    this.image = new Image();
    this.image.src = '/static/bullet.png';
  }

  update() {
    this.position[0] += Math.sin(this.direction) * this.velocity;
    this.position[1] -= Math.cos(this.direction) * this.velocity;
  }

  draw(ctx) {
    const scale = dimensions.getScale(ctx);

    ctx.save()

    ctx.translate(this.position[0] * scale, this.position[1] * scale)
    ctx.rotate(this.direction);

    ctx.drawImage(this.image, 1, 0, this.width, this.height);

    ctx.restore();
  }
}