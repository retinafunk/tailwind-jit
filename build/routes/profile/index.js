import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;


          import '../../_snowpack/pkg/@prefresh.snowpack.runtime.v3.1.2.js';
          import { flushUpdates } from '../../_snowpack/pkg/@prefresh.snowpack.utils.v3.1.2.js';

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
            self.__PREFRESH__.register(type, "./index.js" + " " + id);
          };

          var _s = $RefreshSig$();

import { h } from "../../_snowpack/pkg/preact.v10.5.13.js";
import { useEffect, useState } from "../../_snowpack/pkg/preact.hooks.v10.5.13.js";

const Profile = ({
  user
}) => {
  _s();

  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(10);
  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1e3);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */h("div", null, /* @__PURE__ */h("h1", null, "Profile: ", user), /* @__PURE__ */h("p", null, "This is the user profile for a user named ", user, "."), /* @__PURE__ */h("div", null, "Current time: ", new Date(time).toLocaleString()), /* @__PURE__ */h("p", null, /* @__PURE__ */h("button", {
    onClick: () => setCount(count2 => count2 + 1)
  }, "Click Me"), " ", "Clicked ", count, " times."));
};

_s(Profile, "qz1hFYAFwfMrG+DZA9E1zrwXtiM=");

_c = Profile;
export default Profile;

var _c;

$RefreshReg$(_c, "Profile");

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
          

        