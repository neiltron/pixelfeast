export default class Projectile {
  constructor(opts) {
    this.direction = opts.direction;
    this.velocity = 20;

    this.position = opts.position;

    this.width = 48 / 6;
    this.height = 164 / 6;

    this.image = new Image();
    this.image.src = './static/bullet.png';
  }

  update() {
    this.position[0] += Math.sin(this.direction) * this.velocity;
    this.position[1] -= Math.cos(this.direction) * this.velocity;
  }

  draw(ctx) {
    ctx.save()

    ctx.translate(this.position[0], this.position[1])
    ctx.rotate(this.direction);

    ctx.drawImage(this.image, 1, 0, this.width, this.height);

    ctx.restore();
  }

  detectCollision(obj) {
    // bounding box for the people
    if (
      (this.position[0] > obj.position[0] - obj.width / 2 && this.position[0] < obj.position[0] + obj.width / 2) &&
      (this.position[1] > obj.position[1] - obj.height / 2 && this.position[1] < obj.position[1] + obj.height / 2)
    ) {
      return true;
    }

    return false;
  }
}
