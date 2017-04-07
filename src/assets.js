import events from './events';

export const images = {
  drone: './static/drone.png',
  drone_enemy: './static/drone_enemy.png',
  grass: './static/grass.png',
  road1: './static/road1.png',
  road2: './static/road2.png',
  road3: './static/road3.png',
};

export function loadImages() {
  return Promise.all(Object.keys(images).map(imageName => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      images[imageName] = image;
      resolve();
    };
    image.onerror = reject;
    image.src = images[imageName];
  }))).then(() => {
    events.imagesLoaded.dispatch(images);
    return images;
  });
};
