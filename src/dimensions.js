export const VIEWPORT_WIDTH = 1024;
export const VIEWPORT_HEIGHT = 1024;
export const TILE_SIZE = 128;
export const DRONE_SIZE = 128;
export const GRID_WIDTH = 128;
export const GRID_HEIGHT = 128;
export const MAP_PIXEL_WIDTH = GRID_WIDTH * TILE_SIZE;
export const MAP_PIXEL_HEIGHT = GRID_HEIGHT * TILE_SIZE;

export function getScale(ctx) {
  const {width, height} = ctx.canvas;
  return width < height ?  (width / VIEWPORT_WIDTH) : (height / VIEWPORT_HEIGHT);
};

