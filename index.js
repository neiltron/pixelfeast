/*
  This is a bare-bones, no-bullshit
  example of using browserify + npm.
 */

// Our third-party dependency from npm

var MapGenerator = require('node-voronoi-map');
var mapGenerator = new MapGenerator({
    width:1920,
    height:960,
    seed:992878989,
    shapeSeed:60441019,
    islandShape:'perlin',
    pointSelection:'square',
    oceanRatio:0.5,
    islandFactor:1.0, //1.0 means no small islands; 2.0 leads to a lot
    numberOfLands:'',
    numberOfPoints:200,
    lakeThreshold:0.3,
    riverChance:100,
    roadElevationThresholds:'0, 0.05, 0.37, 0.64',//comma separated
});
var map = mapGenerator.generate();
// console.log(map.map.buildGraph());

console.log(map)

const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');


canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

map.map.centers.forEach(shape => {
  var dims = [];

  ctx.beginPath();
  ctx.strokeStyle = '#f0f';

  if (shape.biome == 'OCEAN') {
    ctx.fillStyle = '#6494a0';
  } else {
    ctx.fillStyle = '#bece9d';
  }

  ctx.moveTo(shape.corners[0].point.x, shape.corners[0].point.y);

  for (var i = 1; i < shape.corners.length; i++) {
    let corner = shape.corners[i];

    ctx.lineTo(corner.point.x, corner.point.y);
  }

  ctx.closePath();
  // ctx.stroke();
  ctx.fill();
})