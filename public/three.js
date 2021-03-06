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

  const texture = PIXI.Texture.from("./beaters-dark-tiny.png");

  /**
   * @type {Array<{
   *    sprite: PIXI.Sprite,
   *    direction: number,
   *    turningSpeed: number,
   *    speed: number,
   *    offset: number,
   *    scale: number,
   * }>}
   */
  const beaters = [];

  function makeBeater() {
    const sprite = new PIXI.Sprite(texture);

    const baseTint = 0xbbbbbb;
    sprite.tint = baseTint + Math.random() * (0xffffff - baseTint);
    sprite.anchor.set(0.5);
    // different beaters, different sizes
    const scale = 0.2 + Math.random() * 0.8;
    sprite.scale.set(scale);
    sprite.zIndex = scale;
    // scatter them all
    sprite.x = Math.random() * app.screen.width;
    sprite.y = Math.random() * app.screen.height;

    // create a random direction in radians
    const direction = Math.random() * Math.PI * 2;

    // this number will be used to modify the direction of the sprite over time
    const turningSpeed = Math.random() - 0.8;

    // create a random speed
    const speed = (20 + Math.random() * 10) * 0.2;

    const offset = Math.random() * 100;

    return {
      sprite,
      direction,
      turningSpeed,
      speed,
      offset,
      scale,
    };
  }

  let newBeater = makeBeater();
  beaters.push(newBeater);
  sprites.addChild(newBeater.sprite);

  // create a bounding box box for the beaters
  const beaterBoundsPadding = 400;

  let tick = 0;
  let lastBeaterAdds = 0;
  const addBeatersEachNTicks = 10;

  app.ticker.add(() => {
    const beaterBounds = new PIXI.Rectangle(
      -beaterBoundsPadding,
      -beaterBoundsPadding,
      app.screen.width + beaterBoundsPadding * 2,
      app.screen.height + beaterBoundsPadding * 2
    );

    background.rotation += 0.0007;

    if (tick - lastBeaterAdds > addBeatersEachNTicks) {
      lastBeaterAdds = tick;

      let newBeater = makeBeater();
      beaters.push(newBeater);
      sprites.addChild(newBeater.sprite);
      sprites.sortChildren();
    }

    for (let i = 0; i < beaters.length; i++) {
      const beater = beaters[i];
      const sprite = beater.sprite;

      // Simulated rotation
      // sprite.scale.x = Math.abs(
      //   Math.sin(tick / beater.offset + beater.offset) * beater.scale
      // );

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
