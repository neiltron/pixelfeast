import Tiles from './src/tiles';

let canvas = document.querySelector('canvas');
canvas.width = 512;
canvas.height = 512;

let ctx = canvas.getContext('2d');

function draw() {
  Tiles.draw(ctx);
}

Tiles.generate();
draw();
