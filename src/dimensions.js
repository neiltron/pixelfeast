export const VIEWPORT_WIDTH = 1024;
export const VIEWPORT_HEIGHT = 1024;
export const TILE_SIZE = 128;
export const GRID_WIDTH = 64;
export const GRID_HEIGHT = 64;

export function getScale(ctx) {
  const {width, height} = ctx.canvas;
  return width < height ?  (width / VIEWPORT_WIDTH) : (height / VIEWPORT_HEIGHT);
};

