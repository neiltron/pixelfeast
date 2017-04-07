import {rand} from './utils';
import * as dimensions from './dimensions';
import {images} from './assets';
import Camera from './camera';

const TILES = {
  GRASS: 0,
  ROAD_H: 1,
  ROAD_V: 2,
  ROAD_INTERSECTION: 3,
  RESERVED: 4,
  GRASS1: 5,
  GRASS2: 6,
  GRASS3: 7,
  GRASS4: 8,
  GRASS5: 9,
};

const IMAGES = [
  'grass',
  'road1',
  'road2',
  'road3',
  'grass',
  'grass1',
  'grass2',
  'grass3',
  'grass4',
  'grass5',
];

const DIRECTIONS = {
  NORTH: [0, -1],
  EAST: [1, 0],
  SOUTH: [0, 1],
  WEST: [-1, 0],
};

let tiles, tileObjects = [];

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

const generateHouses = () => {
  var count, index, x, y, rowHasHouse = false;
  for (y = 1; y < dimensions.GRID_HEIGHT; y += 1) {
    count = 0;
    rowHasHouse = false;
    for (x = 0; x < dimensions.GRID_WIDTH; x += 1) {
      index = y * dimensions.GRID_WIDTH + x;
      if (tiles[index] === TILES.GRASS) {
        count += 1;
      } else {
        count = 0;
      }

      if (count < 2) {
        continue;
      }

      count = 0;

      if (tiles[(y - 1) * dimensions.GRID_WIDTH + x] !== TILES.GRASS) {
        continue;
      }

      if (Math.random() < 0.1) {
        continue;
      }

      rowHasHouse = true;

      tiles[index] = TILES.RESERVED;
      tiles[index - 1] = TILES.RESERVED;
      tileObjects.push({
        image: 'house' + rand(1, 10),
        x: (x - 1) * dimensions.TILE_SIZE,
        y: (y - 1) * dimensions.TILE_SIZE,
        width: dimensions.TILE_SIZE * 2,
        height: dimensions.TILE_SIZE * 2,
        filter: `hue-rotate(${rand(0, 360)}deg)`,
      });
      x += 1;
    }

    if (rowHasHouse) {
      y += 1;
    }
  }
};

export const targetLocation = {
  x: 0,
  y: 0,
};

export default {
  generate() {
    tiles = Array.from(Array(dimensions.GRID_WIDTH * dimensions.GRID_HEIGHT)).map(x => TILES.GRASS);
    generateRoads();
    generateHouses();

    let house = tileObjects[rand(0, tileObjects.length)];
    targetLocation.x = house.x + Math.floor(house.width / 2);
    targetLocation.y = house.y + Math.floor(house.height / 2);

    for (let j = 0; j < tiles.length; j += 1) {
      if (tiles[j] === TILES.GRASS) {
        tiles[j] = TILES['GRASS' + rand(1, 6)];
      }
    }
  },

  setTarget() {
    let house = tileObjects[rand(0, tileObjects.length)];
    targetLocation.x = house.x + Math.floor(house.width / 2);
    targetLocation.y = house.y + Math.floor(house.height / 2);
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

    ctx.save();
    tileObjects.forEach(obj => {
      if (obj.y + obj.height < bounds.y || obj.y > bounds.y + bounds.h) {
        return;
      }

      if (obj.x + obj.width < bounds.x || obj.x > bounds.x + bounds.w) {
        return;
      }

      ctx.filter = obj.filter;
      ctx.drawImage(images[obj.image], obj.x, obj.y, obj.width, obj.height);
    });
    ctx.restore();
  }
};
