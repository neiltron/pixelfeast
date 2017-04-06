import {rand} from './utils';
import * as dimensions from './dimensions';
import {images} from './assets';

const TILES = {
  GRASS: 0,
  ROAD: 1,
};

const IMAGES = [
  'grass',
  'road',
];

const DIRECTIONS = {
  NORTH: [0, -1],
  EAST: [1, 0],
  SOUTH: [0, 1],
  WEST: [-1, 0],
};

let tiles;

function buildRoadVertical(startingColumn) {
  const {NORTH, EAST, SOUTH, WEST} = DIRECTIONS;

  let x = startingColumn;
  let y = dimensions.GRID_HEIGHT - 1;
  let direction = NORTH;
  let possibleDirections;
  let steps = 0;
  let minSteps = 1;

  while (y >= 0) {
    tiles[y * dimensions.GRID_WIDTH + x] = TILES.ROAD;
    if (steps > minSteps) {
      steps = 0;
      minSteps = rand(3, 5);
      if (direction === NORTH) {
        possibleDirections = [NORTH, EAST, WEST];
      } else if (direction === SOUTH) {
        possibleDirections = [EAST, WEST];
      } else if (direction === EAST) {
        possibleDirections = [NORTH, EAST];
      } else if (direction === WEST) { possibleDirections = [NORTH, WEST]; }

      direction = possibleDirections[rand(0, possibleDirections.length)];
    }

    steps += 1;

    x = Math.max(0, Math.min(dimensions.GRID_WIDTH - 1, x + direction[0]));
    y = Math.min(dimensions.GRID_WIDTH - 1, y + direction[1]);
  }
}

function buildRoadHorizontal(startingRow) {
  const {NORTH, EAST, SOUTH, WEST} = DIRECTIONS;

  let x = dimensions.GRID_WIDTH - 1;
  let y = startingRow;
  let direction = WEST;
  let possibleDirections;
  let steps = 0;
  let minSteps = 1;

  while (x >= 0) {
    tiles[y * dimensions.GRID_WIDTH + x] = TILES.ROAD;
    if (steps > minSteps) {
      steps = 0;
      minSteps = rand(3, 5);
      if (direction === WEST) {
        possibleDirections = [WEST, NORTH, SOUTH];
      } else if (direction === EAST) {
        possibleDirections = [NORTH, SOUTH];
      } else if (direction === NORTH) {
        possibleDirections = [WEST, NORTH];
      } else if (direction === SOUTH) {
        possibleDirections = [WEST, SOUTH];
      }

      direction = possibleDirections[rand(0, possibleDirections.length)];
    }

    steps += 1;

    x = Math.min(dimensions.GRID_WIDTH - 1, x + direction[0]);
    y = Math.max(0, Math.min(dimensions.GRID_WIDTH - 1, y + direction[1]));
  }
}

export default {
  generate() {
    tiles = Array.from(Array(dimensions.GRID_WIDTH * dimensions.GRID_HEIGHT)).map(x => TILES.GRASS);

    for (let x = 0; x < dimensions.GRID_WIDTH; x += 1) {
      if (Math.random() < 0.1) {
        buildRoadHorizontal(x);
      }
    }

    for (let y = 0; y < dimensions.GRID_HEIGHT; y += 1) {
      if (Math.random() < 0.1) {
        buildRoadVertical(y);
      }
    }
  },

  draw(ctx) {
    const tileSize = Math.floor(dimensions.TILE_SIZE);

    let tile, y, x;
    for (y = 0; y < dimensions.GRID_HEIGHT; y += 1) {
      for (x = 0; x < dimensions.GRID_WIDTH; x += 1) {
        tile = tiles[y * dimensions.GRID_WIDTH + x];
        ctx.drawImage(images[IMAGES[tile]], Math.floor(x * dimensions.TILE_SIZE), Math.floor(y * dimensions.TILE_SIZE), tileSize + 1, tileSize + 1);
      }
    }
  }
};
