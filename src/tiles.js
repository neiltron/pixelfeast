import {rand} from './utils';
import * as dimensions from './dimensions';
import {images} from './assets';
import Camera from './camera';

const TILES = {
  GRASS: 0,
  ROAD_H: 1,
  ROAD_V: 2,
  ROAD_INTERSECTION: 3,
};

const IMAGES = [
  'grass',
  'road1',
  'road2',
  'road3',
];

const DIRECTIONS = {
  NORTH: [0, -1],
  EAST: [1, 0],
  SOUTH: [0, 1],
  WEST: [-1, 0],
};

let tiles;

const generateRoads = () => {
  for (let x = 0; x < dimensions.GRID_WIDTH; x += 1) {
    if (Math.random() < 0.75) {
      continue;
    }
    for (let y = 0; y < dimensions.GRID_HEIGHT; y += 1) {
      let index = y * dimensions.GRID_WIDTH + x;
      tiles[index] = tiles[index] === TILES.GRASS ? TILES.ROAD_V : TILES.ROAD_INTERSECTION;
    }

    x += 4;
  }

  for (let y = 0; y < dimensions.GRID_HEIGHT; y += 1) {
    if (Math.random() < 0.75) {
      continue;
    }

    for (let x = 0; x < dimensions.GRID_WIDTH; x += 1) {
      let index = y * dimensions.GRID_WIDTH + x;
      tiles[index] = tiles[index] === TILES.GRASS ? TILES.ROAD_H : TILES.ROAD_INTERSECTION;
    }

    y += 2;
  }
};

export default {
  generate() {
    tiles = Array.from(Array(dimensions.GRID_WIDTH * dimensions.GRID_HEIGHT)).map(x => TILES.GRASS);
    generateRoads();
  },

  draw(ctx) {
    const bounds = Camera.getBounds();

    let tile, y, x;
    for (y = 0; y < dimensions.GRID_HEIGHT; y += 1) {
      if ((y + 1) * dimensions.TILE_SIZE < bounds.y || y * dimensions.TILE_SIZE > bounds.y + bounds.h) {
        continue;
      }

      for (x = 0; x < dimensions.GRID_WIDTH; x += 1) {
        if ((x + 1) * dimensions.TILE_SIZE < bounds.x || x * dimensions.TILE_SIZE > bounds.x + bounds.w) {
          continue;
        }

        tile = tiles[y * dimensions.GRID_WIDTH + x];
        ctx.drawImage(images[IMAGES[tile]], Math.floor(x * dimensions.TILE_SIZE), Math.floor(y * dimensions.TILE_SIZE), dimensions.TILE_SIZE, dimensions.TILE_SIZE);
      }
    }
  }
};
