var canvas = document.querySelector('canvas');
canvas.width = 512;
canvas.height = 512;

var ctx = canvas.getContext('2d');

const TILE_SIZE = 8;
const GRID_WIDTH = 64;
const GRID_HEIGHT = 64;
const TILES = {
  GRASS: 0,
  ROAD: 1,
  WATER: 2,
};

const COLORS = [
  '#0f0',
  '#999',
  '#00f',
];

const DIRECTIONS = {
  NORTH: [0, -1],
  EAST: [1, 0],
  SOUTH: [0, 1],
  WEST: [-1, 0],
};

var tiles = Array.from(Array(GRID_WIDTH * GRID_HEIGHT)).map(x => TILES.GRASS);

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function buildRoadVertical(startingColumn) {
  const {NORTH, EAST, SOUTH, WEST} = DIRECTIONS;

  let x = startingColumn;
  let y = GRID_HEIGHT - 1;
  let direction = NORTH;
  let possibleDirections;
  let steps = 0;
  let minSteps = 1;

  while (y >= 0) {
    tiles[y * GRID_WIDTH + x] = TILES.ROAD;
    if (steps > minSteps) {
      steps = 0;
      minSteps = rand(3, 5);
      if (direction === NORTH) {
        possibleDirections = [NORTH, EAST, WEST];
      } else if (direction === SOUTH) {
        possibleDirections = [EAST, WEST];
      } else if (direction === EAST) {
        possibleDirections = [NORTH, EAST];
      } else if (direction === WEST) {
        possibleDirections = [NORTH, WEST];
      }

      direction = possibleDirections[rand(0, possibleDirections.length)];
    }

    steps += 1;

    x = Math.max(0, Math.min(GRID_WIDTH - 1, x + direction[0]));
    y = Math.min(GRID_WIDTH - 1, y + direction[1]);
  }
}

function buildRoadHorizontal(startingRow) {
  const {NORTH, EAST, SOUTH, WEST} = DIRECTIONS;

  let x = GRID_WIDTH - 1;
  let y = startingRow;
  let direction = WEST;
  let possibleDirections;
  let steps = 0;
  let minSteps = 1;

  while (x >= 0) {
    tiles[y * GRID_WIDTH + x] = TILES.ROAD;
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

    x = Math.min(GRID_WIDTH - 1, x + direction[0]);
    y = Math.max(0, Math.min(GRID_WIDTH - 1, y + direction[1]));
  }
}

function draw() {
  var tile;
  for (let y = 0; y < GRID_HEIGHT; y += 1) {
    for (let x = 0; x < GRID_WIDTH; x += 1) {
      tile = tiles[y * GRID_WIDTH + x];
      ctx.fillStyle = COLORS[tile];
      ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

for (let x = 0; x < GRID_WIDTH; x += 1) {
  if (Math.random() < 0.1) {
    buildRoadHorizontal(x);
  }
}

for (let y = 0; y < GRID_HEIGHT; y += 1) {
  if (Math.random() < 0.1) {
    buildRoadVertical(y);
  }
}

draw();
