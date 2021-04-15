import { h, render } from "./_snowpack/pkg/preact.v10.5.13.js";
import "./_snowpack/pkg/preact.devtools.v10.5.13.js";
import App from "./App.js";
const root = document.getElementById("root");

if (root) {
  render( /* @__PURE__ */h(App, null), root);
}