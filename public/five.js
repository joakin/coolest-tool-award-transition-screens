export default function () {
  const tealColor = 0x75ddf0;

  const app = new PIXI.Application({
    backgroundColor: 0x040404,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    resizeTo: window,
    antialias: true,
  });
  document.body.appendChild(app.view);

  const background = PIXI.Sprite.from("./sky.jpg");
  background.anchor.set(0.5);
  background.x = app.screen.width / 2;
  background.y = app.screen.height / 2;
  // background.tint = 0x222222;
  background.alpha = 0.3;
  background.scale.set(0.75);
  app.stage.addChild(background);

  const sprites = new PIXI.ParticleContainer(
    undefined,
    {
      //@ts-ignore the PIXI type definitions don't support scale here although it is definitely needed
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
    },
    undefined,
    true
  );
  sprites.sortableChildren = true;
  app.stage.addChild(sprites);

  const texture = PIXI.Texture.from("./beaters-dark-tiny-rotated.png");

  /**
   * @typedef {Object} Beater
   * @property {PIXI.Sprite} sprite
   * @property {number} direction
   * @property {number} turningSpeed
   * @property {number} speed
   * @property {number} offset
   * @property {number} scale
   * @property {number} rotationSpeed
   */

  /**
   * @type {Array<Beater>}
   */
  const beaters = [];
  const TOTAL_PARTICLES = 100;

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    const sprite = new PIXI.Sprite(texture);

    const baseTint = 0xbbbbbb;
    sprite.tint = baseTint + Math.random() * (0xffffff - baseTint);
    sprite.anchor.set(0.5);
    // different beaters, different sizes
    const scale = 0.2 + Math.random() * 0.8;
    sprite.scale.set(scale);
    sprite.zIndex = scale;
    // scatter them all
    // sprite.x = Math.random() * app.screen.width;
    // sprite.y = Math.random() * app.screen.height;
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;

    // create a random direction in radians
    const direction = Math.random() * Math.PI * 2;

    // this number will be used to modify the direction of the sprite over time
    const turningSpeed = Math.random() - 0.8;

    // create a random speed
    const speed = (10 + Math.random() * 10) * 0.2;

    const offset = Math.random() * 100;

    const rotationSpeed = Math.random();

    beaters.push({
      sprite,
      direction,
      turningSpeed,
      speed,
      offset,
      scale,
      rotationSpeed,
    });
    sprites.addChild(sprite);
  }

  sprites.sortChildren();

  // create a bounding box box for the beaters
  const beaterBoundsPadding = 400;

  let tick = 0;

  app.ticker.add(() => {
    const beaterBounds = new PIXI.Rectangle(
      -beaterBoundsPadding,
      -beaterBoundsPadding,
      app.screen.width + beaterBoundsPadding * 2,
      app.screen.height + beaterBoundsPadding * 2
    );
    background.rotation += 0.0007;
    for (let i = 0; i < beaters.length; i++) {
      const beater = beaters[i];
      const sprite = beater.sprite;

      // Simulated rotation
      sprite.scale.x = fakeRotateWithScaleX(tick, beater);

      beater.direction += beater.turningSpeed * 0.01;
      sprite.x -= Math.sin(beater.direction) * (beater.speed * sprite.scale.y);
      sprite.y -= Math.cos(beater.direction) * (beater.speed * sprite.scale.y);
      sprite.rotation = -beater.direction + Math.PI;

      // wrap the beaters
      if (sprite.x < beaterBounds.x) {
        sprite.x += beaterBounds.width;
      } else if (sprite.x > beaterBounds.x + beaterBounds.width) {
        sprite.x -= beaterBounds.width;
      }

      if (sprite.y < beaterBounds.y) {
        sprite.y += beaterBounds.height;
      } else if (sprite.y > beaterBounds.y + beaterBounds.height) {
        sprite.y -= beaterBounds.height;
      }
    }

    // increment the ticker
    tick += 0.1;
  });
}

/**
 * @param {number} tick
 * @param {Beater} beater
 */
function fakeRotateWithScaleX(tick, beater) {
  let period = 5 + beater.rotationSpeed * 20;
  let x = ((tick + beater.offset) % period) / period;
  // let fn = easeInOutExpo;
  let fn = easeInOutCubic;
  let rotation =
    fn(x < 0.5 ? x / 0.5 : 1 - (x - 0.5) / 0.5) * (beater.scale * 2) -
    beater.scale;
  return rotation;
}

/**
 * @param {number} x
 * @returns number
 */
function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

/**
 * @param {number} x
 * @returns number
 */
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
