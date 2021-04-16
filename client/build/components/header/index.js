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

          import { h } from "../../_snowpack/pkg/preact.v10.5.13.js";
import { Link } from "../../_snowpack/pkg/preact-router.match.v3.2.1.js";

const Header = () => /* @__PURE__ */h("header", null, /* @__PURE__ */h("h1", null, "Preact App"), /* @__PURE__ */h("nav", null, /* @__PURE__ */h(Link, {
  activeClassName: "active",
  href: "/"
}, "Home"), /* @__PURE__ */h(Link, {
  activeClassName: "active",
  href: "/profile"
}, "Me"), /* @__PURE__ */h(Link, {
  activeClassName: "active",
  href: "/profile/john"
}, "John")));

_c = Header;
export default Header;

var _c;

$RefreshReg$(_c, "Header");

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
          

        