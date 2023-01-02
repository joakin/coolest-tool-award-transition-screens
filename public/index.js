import one from "./one.js";
import two from "./two.js";
import three from "./three.js";
import four from "./four.js";
import five from "./five.js";
import six from "./six.js";

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
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
  case "5":
    five();
    break;
  case "6":
    six();
    break;
  default:
    window.location.hash = "#1";
    window.location.reload();
}
