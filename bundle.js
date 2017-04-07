!function e(t,n,r){function i(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return i(n||e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){var e=Date.now()-O;O=Date.now(),D.save(),D.clearRect(0,0,m.width,m.height);var t=c.getScale(D);D.scale(t,t),_.default.translate(D),s.default.draw(D),g.default.forEach(function(e){e.update(),e.draw(D)}),b.forEach(function(t){t.draw(D,e)}),h.default.draw(D,e),D.restore(),requestAnimationFrame(i)}function o(){for(var e=0;e<4;e+=1)b.push(new p.default({position:[Math.random()*c.VIEWPORT_WIDTH,Math.random()*c.VIEWPORT_HEIGHT]}))}var a=e("./src/tiles"),s=r(a),u=e("./src/dimensions"),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u),l=e("./src/copter"),f=(r(l),e("./src/player")),h=r(f),d=e("./src/enemy"),p=r(d),v=e("./src/camera"),_=r(v),y=e("./src/events"),I=r(y),w=e("./src/assets"),E=e("./src/projectiles"),g=r(E),m=document.querySelector("canvas");m.width=512,m.height=512;var D=m.getContext("2d"),O=Date.now(),b=[];s.default.generate();var T=function(){var e=Math.min(window.innerWidth,window.innerHeight);m.width=e,m.height=e};T(),window.addEventListener("resize",T),window.addEventListener("keydown",function(e){I.default.keyDown.dispatch(e)}),window.addEventListener("keyup",function(e){I.default.keyUp.dispatch(e)}),(0,w.loadImages)().then(i).then(o)},{"./src/assets":3,"./src/camera":4,"./src/copter":5,"./src/dimensions":6,"./src/enemy":7,"./src/events":8,"./src/player":9,"./src/projectiles":11,"./src/tiles":12}],2:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e),this._listeners=[],this._dispatchNb=0}return o(e,[{key:"add",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{priority:0,once:!1,context:this},n=i({context:this},t,{function:e});if("function"!=typeof n.function)throw new TypeError("Signal.add() : First argument must be a Function");if(-1!==this._getListernerIndex(n.function,n.context))throw new Error("Signal.add() : Listener already exists");return this._listeners.push(n),this._listeners.sort(function(e,t){return e.priority<t.priority}),this}},{key:"once",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.add(e,i({},t,{once:!0}))}},{key:"remove",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this;if("function"!=typeof e)throw new TypeError("Signal.remove() : First argument must be a Function");var n=this._getListernerIndex(e,t);if(-1===n)throw new Error("Signal.remove() : Listener does not exist");return this._listeners.splice(n,1),this}},{key:"removeAll",value:function(){return this._listeners=[],this}},{key:"dispatch",value:function(){if(++this._dispatchNb>512)throw new Error("Signal.dispatch() : Maximum dispatch limit reached (prevent infinite loop)");for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];for(var r=0;r<this._listeners.length;r++){var i,o=this._listeners[r];o.once&&this._listeners.splice(r);if(!1===(i=o.function).call.apply(i,[o.context].concat(t)))break}return this}},{key:"has",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this;return-1!==this._getListernerIndex(e,t)}},{key:"getListenersNb",value:function(){return this._listeners.length}},{key:"getDispatchNb",value:function(){return this._dispatchNb}},{key:"_getListernerIndex",value:function(e,t){for(var n=0,r=this._listeners.length;n<r;n++)if(this._listeners[n].function===e&&this._listeners[n].context===t)return n;return-1}}]),e}();n.default=a,t.exports=n.default},{}],3:[function(e,t,n){"use strict";function r(){return Promise.all(Object.keys(a).map(function(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){a[e]=r,t()},r.onerror=n,r.src=a[e]})})).then(function(){return o.default.imagesLoaded.dispatch(a),a})}Object.defineProperty(n,"__esModule",{value:!0}),n.images=void 0,n.loadImages=r;var i=e("./events"),o=function(e){return e&&e.__esModule?e:{default:e}}(i),a=n.images={drone:"./static/drone.png",drone_enemy:"./static/drone_enemy.png",grass:"./static/grass.png",road1:"./static/road1.png",road2:"./static/road2.png",road3:"./static/road3.png",house1:"./static/house-1.png",house2:"./static/house-2.png",house3:"./static/house-3.png",house4:"./static/house-4.png",house5:"./static/house-5.png",house6:"./static/house-6.png",house7:"./static/house-7.png",house8:"./static/house-8.png",house9:"./static/house-9.png",house10:"./static/house-10.png"}},{"./events":8}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./events"),o=(r(i),e("./player")),a=r(o),s=e("./dimensions"),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(s),c=0,l=0;n.default={translate:function(e){c=Math.max(0,Math.min(u.GRID_WIDTH*u.TILE_SIZE-u.VIEWPORT_WIDTH,a.default.position[0]-Math.floor(u.VIEWPORT_WIDTH/2))),l=Math.max(0,Math.min(u.GRID_HEIGHT*u.TILE_SIZE-u.VIEWPORT_HEIGHT,a.default.position[1]-Math.floor(u.VIEWPORT_HEIGHT/2))),e.translate(-Math.floor(c),-Math.floor(l))},getBounds:function(){return{x:c,y:l,w:u.VIEWPORT_WIDTH,h:u.VIEWPORT_HEIGHT}}}},{"./dimensions":6,"./events":8,"./player":9}],5:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=e("./events"),s=(r(a),e("./dimensions")),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(s),c=e("./assets"),l=e("./projectiles"),f=r(l),h=e("./projectile"),d=r(h),p=e("./utils"),v=function(){function e(t){i(this,e),t=t||{},this.width=u.DRONE_SIZE,this.height=u.DRONE_SIZE,this.velocityX=0,this.velocityY=0,this.acceleratorX=0,this.acceleratorY=0,this.leftDown=!1,this.rightDown=!1,this.center=[u.VIEWPORT_WIDTH/2-this.width/2,u.VIEWPORT_HEIGHT/2-this.height/2],this.position=t.position||[u.VIEWPORT_WIDTH/2-this.width/2,u.VIEWPORT_HEIGHT/2-this.height/2],this.rotation=0,this.hasPackage=!1}return o(e,[{key:"draw",value:function(e,t){this.velocityX+=this.acceleratorX*t,this.velocityY+=this.acceleratorY*t,this.velocityX=(0,p.clamp)(this.velocityX,-1,1),this.velocityY=(0,p.clamp)(this.velocityY,-1,1),this.position[0]+=this.velocityX*t,this.position[1]+=this.velocityY*t,(this.leftDown||this.rightDown)&&this.leftDown!==this.rightDown&&(this.rotation+=.005*t*(this.leftDown?-1:1)),e.save(),e.translate(Math.floor(this.position[0]),Math.floor(this.position[1])),e.rotate(this.rotation),this.drawSprite(e),e.restore()}},{key:"drawSprite",value:function(e){e.drawImage(c.images.drone,Math.floor(-u.DRONE_SIZE/2),Math.floor(-u.DRONE_SIZE/2),u.DRONE_SIZE,u.DRONE_SIZE)}},{key:"moveLeft",value:function(){this.acceleratorX=-.002}},{key:"moveRight",value:function(){this.acceleratorX=.002}},{key:"moveUp",value:function(){this.acceleratorY=-.002}},{key:"moveDown",value:function(){this.acceleratorY=.002}},{key:"stopHorizontalMovement",value:function(){this.acceleratorX=0}},{key:"stopVerticalMovement",value:function(){this.acceleratorY=0}},{key:"shoot",value:function(){f.default.push(new d.default({direction:this.rotation,position:this.position.slice()}))}}]),e}();n.default=v},{"./assets":3,"./dimensions":6,"./events":8,"./projectile":10,"./projectiles":11,"./utils":13}],6:[function(e,t,n){"use strict";function r(e){var t=e.canvas,n=t.width,r=t.height;return n<r?n/i:r/o}Object.defineProperty(n,"__esModule",{value:!0}),n.getScale=r;var i=n.VIEWPORT_WIDTH=1024,o=n.VIEWPORT_HEIGHT=1024;n.TILE_SIZE=128,n.DRONE_SIZE=128,n.GRID_WIDTH=128,n.GRID_HEIGHT=128},{}],7:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("./copter"),u=function(e){return e&&e.__esModule?e:{default:e}}(s),c=e("./assets"),l=e("./dimensions"),f=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(l),h=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),a(t,[{key:"drawSprite",value:function(e){e.drawImage(c.images.drone_enemy,-f.DRONE_SIZE/2,-f.DRONE_SIZE/2,f.DRONE_SIZE,f.DRONE_SIZE)}}]),t}(u.default);n.default=h},{"./assets":3,"./copter":5,"./dimensions":6}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("quark-signal"),i=function(e){return e&&e.__esModule?e:{default:e}}(r);n.default={keyDown:new i.default,keyUp:new i.default,imagesLoaded:new i.default}},{"quark-signal":2}],9:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=e("./events"),c=r(u),l=e("./copter"),f=r(l),h=function(e){function t(){i(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._handleKeyDown=e._handleKeyDown.bind(e),e._handleKeyUp=e._handleKeyUp.bind(e),e._bind(),e}return a(t,e),s(t,[{key:"_handleKeyDown",value:function(e){"a"==e.key?this.moveLeft():"d"==e.key?this.moveRight():"w"==e.key?this.moveUp():"s"==e.key?this.moveDown():"ArrowLeft"==e.key?this.leftDown=!0:"ArrowRight"==e.key?this.rightDown=!0:"Space"==e.code&&this.shoot()}},{key:"_handleKeyUp",value:function(e){"a"==e.key||"d"==e.key?this.stopHorizontalMovement():"w"==e.key||"s"==e.key?this.stopVerticalMovement():"ArrowLeft"==e.key?this.leftDown=!1:"ArrowRight"==e.key&&(this.rightDown=!1)}},{key:"_bind",value:function(){c.default.keyDown.add(this._handleKeyDown),c.default.keyUp.add(this._handleKeyUp)}}]),t}(f.default);n.default=new h},{"./copter":5,"./events":8}],10:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){r(this,e),this.direction=t.direction,this.velocity=20,this.position=t.position,this.width=8,this.height=164/6,this.image=new Image,this.image.src="./static/bullet.png"}return i(e,[{key:"update",value:function(){this.position[0]+=Math.sin(this.direction)*this.velocity,this.position[1]-=Math.cos(this.direction)*this.velocity}},{key:"draw",value:function(e){e.save(),e.translate(this.position[0],this.position[1]),e.rotate(this.direction),e.drawImage(this.image,1,0,this.width,this.height),e.restore()}}]),e}();n.default=o},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=[]},{}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("./utils"),i=e("./dimensions"),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(i),a=e("./assets"),s=e("./camera"),u=function(e){return e&&e.__esModule?e:{default:e}}(s),c={GRASS:0,ROAD_H:1,ROAD_V:2,ROAD_INTERSECTION:3,RESERVED:4},l=["grass","road1","road2","road3","grass"],f=void 0,h=[],d=function(){for(var e=0;e<o.GRID_WIDTH;e+=1)if(!(Math.random()<.75)){for(var t=0;t<o.GRID_HEIGHT;t+=1){var n=t*o.GRID_WIDTH+e;f[n]=f[n]===c.GRASS?c.ROAD_V:c.ROAD_INTERSECTION}e+=4}for(var r=0;r<o.GRID_HEIGHT;r+=1)if(!(Math.random()<.75)){for(var i=0;i<o.GRID_WIDTH;i+=1){var a=r*o.GRID_WIDTH+i;f[a]=f[a]===c.GRASS?c.ROAD_H:c.ROAD_INTERSECTION}r+=2}},p=function(){var e,t,n,i,a=!1;for(i=1;i<o.GRID_HEIGHT;i+=1){for(e=0,a=!1,n=0;n<o.GRID_WIDTH;n+=1)t=i*o.GRID_WIDTH+n,f[t]===c.GRASS?e+=1:e=0,e<2||(e=0,f[(i-1)*o.GRID_WIDTH+n]===c.GRASS&&(Math.random()<.1||(a=!0,f[t]=c.RESERVED,f[t-1]=c.RESERVED,h.push({image:"house"+(0,r.rand)(1,10),x:(n-1)*o.TILE_SIZE,y:(i-1)*o.TILE_SIZE,width:2*o.TILE_SIZE,height:2*o.TILE_SIZE,filter:"hue-rotate("+(0,r.rand)(0,360)+"deg)"}),n+=1)));a&&(i+=1)}};n.default={generate:function(){f=Array.from(Array(o.GRID_WIDTH*o.GRID_HEIGHT)).map(function(e){return c.GRASS}),d(),p()},draw:function(e){var t=u.default.getBounds(),n=void 0,r=void 0,i=void 0;for(r=0;r<o.GRID_HEIGHT;r+=1)if(!((r+1)*o.TILE_SIZE<t.y||r*o.TILE_SIZE>t.y+t.h))for(i=0;i<o.GRID_WIDTH;i+=1)(i+1)*o.TILE_SIZE<t.x||i*o.TILE_SIZE>t.x+t.w||(n=f[r*o.GRID_WIDTH+i],e.drawImage(a.images[l[n]],Math.floor(i*o.TILE_SIZE),Math.floor(r*o.TILE_SIZE),o.TILE_SIZE,o.TILE_SIZE));e.save(),h.forEach(function(n){n.y+n.height<t.y||n.y>t.y+t.h||n.x+n.width<t.x||n.x>t.x+t.w||(e.filter=n.filter,e.drawImage(a.images[n.image],n.x,n.y,n.width,n.height))}),e.restore()}}},{"./assets":3,"./camera":4,"./dimensions":6,"./utils":13}],13:[function(e,t,n){"use strict";function r(e,t){return e+Math.floor(Math.random()*(t-e))}function i(e,t,n){return Math.min(Math.max(e,t),n)}Object.defineProperty(n,"__esModule",{value:!0}),n.rand=r,n.clamp=i},{}]},{},[1]);
