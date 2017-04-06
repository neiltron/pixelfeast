export function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min));
};


export function clamp (val, min, max) {
  return Math.min( Math.max( val, min ), max );
}