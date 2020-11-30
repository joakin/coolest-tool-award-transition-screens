import one from "./one.js";
import two from "./two.js";
import three from "./three.js";
import four from "./four.js";

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
      window.location.hash = event.key;
      window.location.reload();
      break;
  }
});

switch (window.location.hash.slice(1)) {
  case "1":
    one();
    break;
  case "2":
    two();
    break;
  case "3":
    three();
    break;
  case "4":
    four();
    break;
  default:
    window.location.hash = "#1";
    window.location.reload();
}
