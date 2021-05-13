import * as __SNOWPACK_ENV__ from './_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;


          import '@prefresh/snowpack/runtime';
          import { flushUpdates } from '@prefresh/snowpack/utils';

          const prevRefreshReg = self.$RefreshReg$ || (() => {});
          const prevRefreshSig = self.$RefreshSig$ || (() => (type) => type);

          self.$RefreshSig$ = () => {
            let status = 'begin';
            let savedType;
            return (type, key, forceReset, getCustomHooks) => {
              if (!savedType) savedType = type;
              status = self.__PREFRESH__.sign(type || savedType, key, forceReset, getCustomHooks, status);
              return type;
            };
          };

          self.$RefreshReg$ = (type, id) => {
            self.__PREFRESH__.register(type, "./App.js" + " " + id);
          };

          import { h } from "preact";
import { Router } from "preact-router";
import Header from "./components/header/index.js";
import Home from "./routes/home/index.js";
import Profile from "./routes/profile/index.js";

const App = () => /* @__PURE__ */h("div", {
  id: "app",
  class: "flex-col items-stretch absolute w-full min-h-full"
}, /* @__PURE__ */h(Header, null), /* @__PURE__ */h("div", {
  class: "flex-grow"
}, /* @__PURE__ */h(Router, null, /* @__PURE__ */h(Home, {
  path: "/"
}), /* @__PURE__ */h(Profile, {
  path: "/profile/",
  user: "me"
}), /* @__PURE__ */h(Profile, {
  path: "/profile/:user"
}))), /* @__PURE__ */h("div", null, "some code inside (p)react api-service, but outside router"));

_c = App;
export default App;

var _c;

$RefreshReg$(_c, "App");

          self.$RefreshSig$ = prevRefreshSig;
          self.$RefreshReg$ = prevRefreshReg;

          
          if (undefined /* [snowpack] import.meta.hot */ ) {
            undefined /* [snowpack] import.meta.hot */ .accept(({ module }) => {
              try {
                flushUpdates();
              } catch(e) {
                undefined /* [snowpack] import.meta.hot */ .invalidate();
              }
            });
          }
          

