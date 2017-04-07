!function e(t,i,n){function o(a,s){if(!i[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=i[a]={exports:{}};t[a][0].call(l.exports,function(e){var i=t[a][1][e];return o(i||e)},l,l.exports,e,t,i,n)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(){var e=Date.now()-O;O=Date.now(),D.save(),D.clearRect(0,0,m.width,m.height);var t=c.getScale(D);if(D.scale(t,t),y.default.translate(D),s.default.draw(D),g.default.length>0&&T.length>0){var i=y.default.getBounds();g.default.forEach(function(e,t){for(var n=0;n<T.length;n++){var o=T[n];if(e.playerID!=o.id&&((!(o.position[1]+o.height<i.y||o.position[1]>i.y+i.h)||!(o.position[0]+o.width<i.x||o.position[0]>i.x+i.w))&&e.detectCollision(o))){o.explode(),g.default.splice(t,1);break}}Date.now()-e.created>4e3?g.default.splice(t,1):(e.update(),e.draw(D))})}T.forEach(function(t,i){t.scale<.4?T.splice(i,1):t.draw(D,e)}),f.default.draw(D,e),D.restore(),requestAnimationFrame(o)}function r(){for(var e=0;e<10;e+=1)T.push(new p.default({position:[Math.random()*c.MAP_PIXEL_WIDTH,Math.random()*c.MAP_PIXEL_HEIGHT]}))}var a=e("./src/tiles"),s=n(a),u=e("./src/dimensions"),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(u),l=e("./src/copter"),h=(n(l),e("./src/player")),f=n(h),d=e("./src/enemy"),p=n(d),_=e("./src/camera"),y=n(_),v=e("./src/events"),I=n(v),E=e("./src/assets"),w=e("./src/projectiles"),g=n(w),m=document.querySelector("canvas");m.width=512,m.height=512;var D=m.getContext("2d"),O=Date.now(),T=[];s.default.generate();var b=function(){var e=Math.min(window.innerWidth,window.innerHeight);m.width=e,m.height=e};b(),window.addEventListener("resize",b),window.addEventListener("keydown",function(e){I.default.keyDown.dispatch(e)}),window.addEventListener("keyup",function(e){I.default.keyUp.dispatch(e)}),(0,E.loadImages)().then(o).then(r)},{"./src/assets":3,"./src/camera":4,"./src/copter":5,"./src/dimensions":6,"./src/enemy":7,"./src/events":8,"./src/player":9,"./src/projectiles":11,"./src/tiles":12}],2:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){function e(){n(this,e),this._listeners=[],this._dispatchNb=0}return r(e,[{key:"add",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{priority:0,once:!1,context:this},i=o({context:this},t,{function:e});if("function"!=typeof i.function)throw new TypeError("Signal.add() : First argument must be a Function");if(-1!==this._getListernerIndex(i.function,i.context))throw new Error("Signal.add() : Listener already exists");return this._listeners.push(i),this._listeners.sort(function(e,t){return e.priority<t.priority}),this}},{key:"once",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.add(e,o({},t,{once:!0}))}},{key:"remove",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this;if("function"!=typeof e)throw new TypeError("Signal.remove() : First argument must be a Function");var i=this._getListernerIndex(e,t);if(-1===i)throw new Error("Signal.remove() : Listener does not exist");return this._listeners.splice(i,1),this}},{key:"removeAll",value:function(){return this._listeners=[],this}},{key:"dispatch",value:function(){if(++this._dispatchNb>512)throw new Error("Signal.dispatch() : Maximum dispatch limit reached (prevent infinite loop)");for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];for(var n=0;n<this._listeners.length;n++){var o,r=this._listeners[n];r.once&&this._listeners.splice(n);if(!1===(o=r.function).call.apply(o,[r.context].concat(t)))break}return this}},{key:"has",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this;return-1!==this._getListernerIndex(e,t)}},{key:"getListenersNb",value:function(){return this._listeners.length}},{key:"getDispatchNb",value:function(){return this._dispatchNb}},{key:"_getListernerIndex",value:function(e,t){for(var i=0,n=this._listeners.length;i<n;i++)if(this._listeners[i].function===e&&this._listeners[i].context===t)return i;return-1}}]),e}();i.default=a,t.exports=i.default},{}],3:[function(e,t,i){"use strict";function n(){return Promise.all(Object.keys(a).map(function(e){return new Promise(function(t,i){var n=new Image;n.onload=function(){a[e]=n,t()},n.onerror=i,n.src=a[e]})})).then(function(){return r.default.imagesLoaded.dispatch(a),a})}Object.defineProperty(i,"__esModule",{value:!0}),i.images=void 0,i.loadImages=n;var o=e("./events"),r=function(e){return e&&e.__esModule?e:{default:e}}(o),a=i.images={drone:"./static/drone.png",drone_enemy:"./static/drone_enemy.png",grass:"./static/grass.png",road1:"./static/road1.png",road2:"./static/road2.png",road3:"./static/road3.png",house1:"./static/house-1.png",house2:"./static/house-2.png",house3:"./static/house-3.png",house4:"./static/house-4.png",house5:"./static/house-5.png",house6:"./static/house-6.png",house7:"./static/house-7.png",house8:"./static/house-8.png",house9:"./static/house-9.png",house10:"./static/house-10.png",explosion:"./static/explosion.png"}},{"./events":8}],4:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(i,"__esModule",{value:!0});var o=e("./events"),r=(n(o),e("./player")),a=n(r),s=e("./dimensions"),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(s),c=0,l=0;i.default={translate:function(e){c=Math.max(0,Math.min(u.GRID_WIDTH*u.TILE_SIZE-u.VIEWPORT_WIDTH,a.default.position[0]-Math.floor(u.VIEWPORT_WIDTH/2))),l=Math.max(0,Math.min(u.GRID_HEIGHT*u.TILE_SIZE-u.VIEWPORT_HEIGHT,a.default.position[1]-Math.floor(u.VIEWPORT_HEIGHT/2))),e.translate(-Math.floor(c),-Math.floor(l))},getBounds:function(){return{x:c,y:l,w:u.VIEWPORT_WIDTH,h:u.VIEWPORT_HEIGHT}}}},{"./dimensions":6,"./events":8,"./player":9}],5:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=e("./events"),s=n(a),u=e("./dimensions"),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(u),l=e("./assets"),h=e("./projectiles"),f=n(h),d=e("./projectile"),p=n(d),_=e("./utils"),y=function(){function e(t){o(this,e),t=t||{},this.id=Math.floor(1e4*Math.random()),this.width=c.DRONE_SIZE,this.height=c.DRONE_SIZE,this.scale=1,this.velocityX=0,this.velocityY=0,this.acceleratorX=0,this.acceleratorY=0,this.leftDown=!1,this.rightDown=!1,this.center=[c.VIEWPORT_WIDTH/2-this.width/2,c.VIEWPORT_HEIGHT/2-this.height/2],this.position=t.position||[c.MAP_PIXEL_WIDTH/2-this.width/2,c.MAP_PIXEL_HEIGHT/2-this.height/2],this.rotation=0,this.hasPackage=!1,this.explosionFrame=-1}return r(e,[{key:"update",value:function(e){"function"==typeof this._update&&this._update(e),this.velocityX+=this.acceleratorX*e,this.velocityY+=this.acceleratorY*e,this.velocityX=(0,_.clamp)(this.velocityX,-1,1),this.velocityY=(0,_.clamp)(this.velocityY,-1,1),this.checkOOB(),this.position[0]+=this.velocityX*e,this.position[1]+=this.velocityY*e,(this.leftDown||this.rightDown)&&this.leftDown!==this.rightDown&&(this.rotation+=.005*e*(this.leftDown?-1:1)),this.explosionFrame>0&&(this.scale-=.05)}},{key:"draw",value:function(e,t){this.update(t),this.explosionFrame>=0&&(this.explosionFrame+=.25),e.save(),e.translate(Math.floor(this.position[0]),Math.floor(this.position[1])),e.rotate(this.rotation),this.drawSprite(e),e.restore()}},{key:"drawSprite",value:function(e){e.drawImage(l.images.drone,Math.floor(-c.DRONE_SIZE/2),Math.floor(-c.DRONE_SIZE/2),c.DRONE_SIZE*this.scale,c.DRONE_SIZE*this.scale)}},{key:"moveLeft",value:function(){this.acceleratorX=-.002}},{key:"moveRight",value:function(){this.acceleratorX=.002}},{key:"moveUp",value:function(){this.acceleratorY=-.002}},{key:"moveDown",value:function(){this.acceleratorY=.002}},{key:"stopHorizontalMovement",value:function(){this.acceleratorX=0}},{key:"stopVerticalMovement",value:function(){this.acceleratorY=0}},{key:"shoot",value:function(){f.default.push(new p.default({direction:this.rotation,position:this.position.slice(),playerID:this.id}))}},{key:"explode",value:function(){this.explosionFrame=0,s.default.explode.dispatch()}},{key:"checkOOB",value:function(){this.position[0]<0?(this.position[0]=1,this.velocityX=.05,this.acceleratorX=5e-6):this.position[0]>c.MAP_PIXEL_WIDTH?(this.position[0]=c.GRID_WIDTH*c.TILE_SIZE,this.velocityX=-.05,this.acceleratorX=-5e-6):this.position[1]<0?(this.position[1]=1,this.velocityY=.05,this.acceleratorY=5e-6):this.position[1]>c.MAP_PIXEL_HEIGHT&&(this.position[1]=c.GRID_HEIGHT*c.TILE_SIZE,this.velocityY=-.05,this.acceleratorY=-5e-6)}},{key:"distanceFrom",value:function(e){var t=e.position[0]-this.position[0],i=e.position[1]-this.position[1];return Math.sqrt(t*t+i*i)}}]),e}();i.default=y},{"./assets":3,"./dimensions":6,"./events":8,"./projectile":10,"./projectiles":11,"./utils":13}],6:[function(e,t,i){"use strict";function n(e){var t=e.canvas,i=t.width,n=t.height;return i<n?i/o:n/r}Object.defineProperty(i,"__esModule",{value:!0}),i.getScale=n;var o=i.VIEWPORT_WIDTH=1024,r=i.VIEWPORT_HEIGHT=1024,a=i.TILE_SIZE=128,s=(i.DRONE_SIZE=128,i.GRID_WIDTH=128),u=i.GRID_HEIGHT=128;i.MAP_PIXEL_WIDTH=s*a,i.MAP_PIXEL_HEIGHT=u*a},{}],7:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=e("./copter"),c=n(u),l=e("./assets"),h=e("./dimensions"),f=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(h),d=e("./player"),p=n(d),_=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"drawSprite",value:function(e){e.drawImage(l.images.drone_enemy,-f.DRONE_SIZE/2,-f.DRONE_SIZE/2,f.DRONE_SIZE*this.scale,f.DRONE_SIZE*this.scale),this.explosionFrame>0&&e.drawImage(l.images.explosion,64*Math.floor(Math.floor(this.explosionFrame)/5),Math.floor(this.explosionFrame)%5*64,64,64,-f.DRONE_SIZE/2,-f.DRONE_SIZE/2,f.DRONE_SIZE,f.DRONE_SIZE)}},{key:"_update",value:function(e){this.distanceFrom(p.default)<f.VIEWPORT_WIDTH/1.1&&Math.random()>.98&&this.shoot(),this.acceleratorX=(Math.random()-Math.random())/5e3,this.acceleratorY=(Math.random()-Math.random())/5e3,this.rotation=Math.atan2(p.default.position[1]-this.position[1],p.default.position[0]-this.position[0])+Math.PI/2}}]),t}(c.default);i.default=_},{"./assets":3,"./copter":5,"./dimensions":6,"./player":9}],8:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("quark-signal"),o=function(e){return e&&e.__esModule?e:{default:e}}(n);i.default={keyDown:new o.default,keyUp:new o.default,imagesLoaded:new o.default,explode:new o.default}},{"quark-signal":2}],9:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=e("./events"),c=n(u),l=e("./copter"),h=n(l),f=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._handleKeyDown=e._handleKeyDown.bind(e),e._handleKeyUp=e._handleKeyUp.bind(e),e._bind(),e}return a(t,e),s(t,[{key:"_handleKeyDown",value:function(e){"a"==e.key?this.moveLeft():"d"==e.key?this.moveRight():"w"==e.key?this.moveUp():"s"==e.key?this.moveDown():"ArrowLeft"==e.key?this.leftDown=!0:"ArrowRight"==e.key?this.rightDown=!0:"Space"==e.code&&this.shoot()}},{key:"_handleKeyUp",value:function(e){"a"==e.key||"d"==e.key?this.stopHorizontalMovement():"w"==e.key||"s"==e.key?this.stopVerticalMovement():"ArrowLeft"==e.key?this.leftDown=!1:"ArrowRight"==e.key&&(this.rightDown=!1)}},{key:"_bind",value:function(){c.default.keyDown.add(this._handleKeyDown),c.default.keyUp.add(this._handleKeyUp)}}]),t}(h.default);i.default=new f},{"./copter":5,"./events":8}],10:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t){n(this,e),this.playerID=t.playerID,this.created=Date.now(),this.direction=t.direction,this.velocity=20,this.position=t.position,this.width=8,this.height=164/6,this.image=new Image,this.image.src="./static/bullet.png"}return o(e,[{key:"update",value:function(){this.position[0]+=Math.sin(this.direction)*this.velocity,this.position[1]-=Math.cos(this.direction)*this.velocity}},{key:"draw",value:function(e){e.save(),e.translate(this.position[0],this.position[1]),e.rotate(this.direction),e.drawImage(this.image,1,0,this.width,this.height),e.restore()}},{key:"detectCollision",value:function(e){return this.position[0]>e.position[0]-e.width/2&&this.position[0]<e.position[0]+e.width/2&&this.position[1]>e.position[1]-e.height/2&&this.position[1]<e.position[1]+e.height/2}}]),e}();i.default=r},{}],11:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=[]},{}],12:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("./utils"),o=e("./dimensions"),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(o),a=e("./assets"),s=e("./camera"),u=function(e){return e&&e.__esModule?e:{default:e}}(s),c={GRASS:0,ROAD_H:1,ROAD_V:2,ROAD_INTERSECTION:3,RESERVED:4},l=["grass","road1","road2","road3","grass"],h=void 0,f=[],d=function(){for(var e=0;e<r.GRID_WIDTH;e+=1)if(!(Math.random()<.75)){for(var t=0;t<r.GRID_HEIGHT;t+=1){var i=t*r.GRID_WIDTH+e;h[i]=h[i]===c.GRASS?c.ROAD_V:c.ROAD_INTERSECTION}e+=4}for(var n=0;n<r.GRID_HEIGHT;n+=1)if(!(Math.random()<.75)){for(var o=0;o<r.GRID_WIDTH;o+=1){var a=n*r.GRID_WIDTH+o;h[a]=h[a]===c.GRASS?c.ROAD_H:c.ROAD_INTERSECTION}n+=2}},p=function(){var e,t,i,o,a=!1;for(o=1;o<r.GRID_HEIGHT;o+=1){for(e=0,a=!1,i=0;i<r.GRID_WIDTH;i+=1)t=o*r.GRID_WIDTH+i,h[t]===c.GRASS?e+=1:e=0,e<2||(e=0,h[(o-1)*r.GRID_WIDTH+i]===c.GRASS&&(Math.random()<.1||(a=!0,h[t]=c.RESERVED,h[t-1]=c.RESERVED,f.push({image:"house"+(0,n.rand)(1,10),x:(i-1)*r.TILE_SIZE,y:(o-1)*r.TILE_SIZE,width:2*r.TILE_SIZE,height:2*r.TILE_SIZE,filter:"hue-rotate("+(0,n.rand)(0,360)+"deg)"}),i+=1)));a&&(o+=1)}};i.default={generate:function(){h=Array.from(Array(r.GRID_WIDTH*r.GRID_HEIGHT)).map(function(e){return c.GRASS}),d(),p()},draw:function(e){var t=u.default.getBounds(),i=void 0,n=void 0,o=void 0;for(n=0;n<r.GRID_HEIGHT;n+=1)if(!((n+1)*r.TILE_SIZE<t.y||n*r.TILE_SIZE>t.y+t.h))for(o=0;o<r.GRID_WIDTH;o+=1)(o+1)*r.TILE_SIZE<t.x||o*r.TILE_SIZE>t.x+t.w||(i=h[n*r.GRID_WIDTH+o],e.drawImage(a.images[l[i]],Math.floor(o*r.TILE_SIZE),Math.floor(n*r.TILE_SIZE),r.TILE_SIZE,r.TILE_SIZE));e.save(),f.forEach(function(i){i.y+i.height<t.y||i.y>t.y+t.h||i.x+i.width<t.x||i.x>t.x+t.w||(e.filter=i.filter,e.drawImage(a.images[i.image],i.x,i.y,i.width,i.height))}),e.restore()}}},{"./assets":3,"./camera":4,"./dimensions":6,"./utils":13}],13:[function(e,t,i){"use strict";function n(e,t){return e+Math.floor(Math.random()*(t-e))}function o(e,t,i){return Math.min(Math.max(e,t),i)}Object.defineProperty(i,"__esModule",{value:!0}),i.rand=n,i.clamp=o},{}]},{},[1]);
