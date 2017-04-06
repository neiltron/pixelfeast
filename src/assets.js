export const images = {
  grass: './static/grass.png',
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
  })));
};
