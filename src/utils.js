export function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

export function clamp (val, min, max) {
  return Math.min( Math.max( val, min ), max );
}

export function getAngle ([x1, y1, x2, y2]) {
  return Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
}