import { options, Component } from '/_snowpack/pkg/preact.v10.5.13.js';

const VNODE_COMPONENT = '__c';
const NAMESPACE = '__PREFRESH__';
const COMPONENT_HOOKS = '__H';
const HOOKS_LIST = '__';
const EFFECTS_LIST = '__h';
const RERENDER_COUNT = '__r';
const CATCH_ERROR_OPTION = '__e';
const COMPONENT_DIRTY = '__d';
const VNODE_DOM = '__e';
const VNODE_CHILDREN = '__k';
const HOOK_VALUE = '__';
const HOOK_ARGS = '__H';
const HOOK_CLEANUP = '__c';

const oldCatchError = options[CATCH_ERROR_OPTION];
options[CATCH_ERROR_OPTION] = (error, vnode, oldVNode) => {
  if (vnode[VNODE_COMPONENT] && vnode[VNODE_COMPONENT][COMPONENT_DIRTY]) {
    vnode[VNODE_COMPONENT][COMPONENT_DIRTY] = false;
  }

  if (oldCatchError) oldCatchError(error, vnode, oldVNode);
};

const defer =
  typeof Promise == 'function'
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout;

options.debounceRendering = process => {
  defer(() => {
    try {
      process();
    } catch (e) {
      process[RERENDER_COUNT] = 0;
      throw e;
    }
  });
};

// all vnodes referencing a given constructor
const vnodesForComponent = new WeakMap();
const mappedVNodes = new WeakMap();

const getMappedVnode = type => {
  if (mappedVNodes.has(type)) {
    return getMappedVnode(mappedVNodes.get(type));
  }

  return type;
};

const oldVnode = options.vnode;
options.vnode = vnode => {
  if (vnode && typeof vnode.type === 'function') {
    const vnodes = vnodesForComponent.get(vnode.type);
    if (!vnodes) {
      vnodesForComponent.set(vnode.type, [vnode]);
    } else {
      vnodes.push(vnode);
    }

    const foundType = getMappedVnode(vnode.type);
    vnode.type = foundType;
    if (vnode[VNODE_COMPONENT]) {
      vnode[VNODE_COMPONENT].constructor = foundType;
    }
  }

  if (oldVnode) oldVnode(vnode);
};

const oldUnmount = options.unmount;
options.unmount = vnode => {
  const type = (vnode || {}).type;
  if (typeof type === 'function' && vnodesForComponent.has(type)) {
    const vnodes = vnodesForComponent.get(type);
    if (vnodes) {
      const index = vnodes.indexOf(vnode);
      if (index !== -1) {
        vnodes.splice(index, 1);
      }
    }
  }

  if (oldUnmount) oldUnmount(vnode);
};

// Signatures for functional components and custom hooks.
const signaturesForType = new WeakMap();

/**
 *
 * This part has been vendored from "react-refresh"
 * https://github.com/facebook/react/blob/master/packages/react-refresh/src/ReactFreshRuntime.js#L83
 */
const computeKey = signature => {
  let fullKey = signature.key;
  let hooks;

  try {
    hooks = signature.getCustomHooks();
  } catch (err) {
    signature.forceReset = true;
    return fullKey;
  }

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (typeof hook !== 'function') {
      signature.forceReset = true;
      return fullKey;
    }

    const nestedHookSignature = signaturesForType.get(hook);
    if (nestedHookSignature === undefined) continue;

    const nestedHookKey = computeKey(nestedHookSignature);
    if (nestedHookSignature.forceReset) signature.forceReset = true;

    fullKey += '\n---\n' + nestedHookKey;
  }

  return fullKey;
};

// Options for Preact.

let typesById = new Map();
let pendingUpdates = [];

function sign(type, key, forceReset, getCustomHooks, status) {
  if (type) {
    let signature = signaturesForType.get(type);
    if (status === 'begin') {
      signaturesForType.set(type, {
        type,
        key,
        forceReset,
        getCustomHooks: getCustomHooks || (() => []),
      });

      return 'needsHooks';
    } else if (status === 'needsHooks') {
      signature.fullKey = computeKey(signature);
    }
  }
}

function replaceComponent(OldType, NewType, resetHookState) {
  const vnodes = vnodesForComponent.get(OldType);
  if (!vnodes) return;

  // migrate the list to our new constructor reference
  vnodesForComponent.delete(OldType);
  vnodesForComponent.set(NewType, vnodes);

  mappedVNodes.set(OldType, NewType);

  pendingUpdates = pendingUpdates.filter(p => p[0] !== OldType);

  vnodes.forEach(vnode => {
    // update the type in-place to reference the new component
    vnode.type = NewType;

    if (vnode[VNODE_COMPONENT]) {
      vnode[VNODE_COMPONENT].constructor = vnode.type;

      try {
        if (vnode[VNODE_COMPONENT] instanceof OldType) {
          const oldInst = vnode[VNODE_COMPONENT];

          const newInst = new NewType(
            vnode[VNODE_COMPONENT].props,
            vnode[VNODE_COMPONENT].context
          );

          vnode[VNODE_COMPONENT] = newInst;
          // copy old properties onto the new instance.
          //   - Objects (including refs) in the new instance are updated with their old values
          //   - Missing or null properties are restored to their old values
          //   - Updated Functions are not reverted
          //   - Scalars are copied
          for (let i in oldInst) {
            const type = typeof oldInst[i];
            if (!(i in newInst)) {
              newInst[i] = oldInst[i];
            } else if (type !== 'function' && typeof newInst[i] === type) {
              if (
                type === 'object' &&
                newInst[i] != null &&
                newInst[i].constructor === oldInst[i].constructor
              ) {
                Object.assign(newInst[i], oldInst[i]);
              } else {
                newInst[i] = oldInst[i];
              }
            }
          }
        }
      } catch (e) {
        /* Functional component */
        vnode[VNODE_COMPONENT].constructor = NewType;
      }

      if (resetHookState) {
        if (
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS] &&
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST] &&
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST].length
        ) {
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST].forEach(
            possibleEffect => {
              if (
                possibleEffect[HOOK_CLEANUP] &&
                typeof possibleEffect[HOOK_CLEANUP] === 'function'
              ) {
                possibleEffect[HOOK_CLEANUP]();
              } else if (
                possibleEffect[HOOK_ARGS] &&
                possibleEffect[HOOK_VALUE] &&
                Object.keys(possibleEffect).length === 3
              ) {
                const cleanupKey = Object.keys(possibleEffect).find(
                  key => key !== HOOK_ARGS && key !== HOOK_VALUE
                );
                if (
                  cleanupKey &&
                  typeof possibleEffect[cleanupKey] == 'function'
                )
                  possibleEffect[cleanupKey]();
              }
            }
          );
        }

        vnode[VNODE_COMPONENT][COMPONENT_HOOKS] = {
          [HOOKS_LIST]: [],
          [EFFECTS_LIST]: [],
        };
      } else {
        if (
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS] &&
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST] &&
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST].length
        ) {
          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST].forEach(
            possibleEffect => {
              if (
                possibleEffect[HOOK_CLEANUP] &&
                typeof possibleEffect[HOOK_CLEANUP] === 'function'
              ) {
                possibleEffect[HOOK_CLEANUP]();
              } else if (
                possibleEffect[HOOK_ARGS] &&
                possibleEffect[HOOK_VALUE] &&
                Object.keys(possibleEffect).length === 3
              ) {
                const cleanupKey = Object.keys(possibleEffect).find(
                  key => key !== HOOK_ARGS && key !== HOOK_VALUE
                );
                if (
                  cleanupKey &&
                  typeof possibleEffect[cleanupKey] == 'function'
                )
                  possibleEffect[cleanupKey]();
              }
            }
          );

          vnode[VNODE_COMPONENT][COMPONENT_HOOKS][HOOKS_LIST].forEach(
            hook => {
              if (
                hook.__H &&
                Array.isArray(hook.__H)
              ) {
                hook.__H = undefined;
              }
            }
          );
        }
      }

      // Cleanup when an async component has thrown.
      if (
        (vnode[VNODE_DOM] && !document.contains(vnode[VNODE_DOM])) ||
        (!vnode[VNODE_DOM] && !vnode[VNODE_CHILDREN])
      ) {
        location.reload();
      }

      Component.prototype.forceUpdate.call(vnode[VNODE_COMPONENT]);
    }
  });
}

self[NAMESPACE] = {
  getSignature: type => signaturesForType.get(type),
  register: (type, id) => {
    if (typeof type !== 'function') return;

    if (typesById.has(id)) {
      const existing = typesById.get(id);
      if (existing !== type) {
        pendingUpdates.push([existing, type]);
        typesById.set(id, type);
      }
    } else {
      typesById.set(id, type);
    }

    if (!signaturesForType.has(type)) {
      signaturesForType.set(type, {
        getCustomHooks: () => [],
        type,
      });
    }
  },
  getPendingUpdates: () => pendingUpdates,
  flush: () => {
    pendingUpdates = [];
  },
  replaceComponent,
  sign,
  computeKey,
};
