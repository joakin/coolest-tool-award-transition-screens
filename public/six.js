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

  //   const whiteBox = new PIXI.Graphics();
  //   whiteBox.beginFill(0xffffff);
  //   // graphics.drawRect(-550, -320, 1100, 640);
  //   let [whiteBoxWidth, whiteBoxHeight] = [640, 600];
  //   whiteBox.drawRoundedRect(
  //     -whiteBoxWidth / 2,
  //     -whiteBoxHeight / 2,
  //     whiteBoxWidth,
  //     whiteBoxHeight,
  //     10
  //   );
  //   whiteBox.endFill();
  //   whiteBox.alpha = 0.5;
  //   whiteBox.x = app.screen.width / 2;
  //   whiteBox.y = app.screen.height / 2;
  //   whiteBox.blendMode = PIXI.BLEND_MODES.ADD;
  //   app.stage.addChild(whiteBox);

  const logo = PIXI.Sprite.from("./Coolest Tool Award Logo.png");
  logo.anchor.set(0.5);
  logo.x = app.screen.width / 2;
  logo.y = app.screen.height * 0.37;
  // logo.tint = 0x222222;
  // logo.alpha = 0.99;
  logo.scale.set(0.5);
  app.stage.addChild(logo);

  let text = document.createElement("div");
  text.style.fontFamily = "Impact";
  text.style.fontSize = "128px";
  text.style.color = "rgb(209, 209, 209)";
  text.style.position = "absolute";
  text.style.top = `${logo.y + 300}px`;
  text.style.textAlign = "left";
  text.style.textShadow = "0px 5px 10px black";
  document.body.appendChild(text);

  let allTime = 6 * 60 * 1000;
  let lastSecond = allTime;
  text.innerText = displayTime(lastSecond);
  text.style.left = `${
    app.screen.width / 2 - text.getBoundingClientRect().width / 2
  }px`;
  app.ticker.add(() => {
    if (allTime - app.ticker.lastTime <= lastSecond - 1000) {
      lastSecond -= 1000;
      text.innerText = displayTime(lastSecond);
    }
    app.ticker.lastTime;
    background.rotation += 0.0005;
  });
}

/**
 * @param {number} ms
 * @returns {string}
 */
function displayTime(ms) {
  console.log(ms);
  return `${Math.floor(ms / 60000)}:${String((ms % 60000) / 1000).padStart(
    2,
    "0"
  )}`;
}
