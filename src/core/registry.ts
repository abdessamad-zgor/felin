import { Computed } from "../primitives/computed";
import { Effect } from "../primitives/effect";
import { State } from "../primitives/state";
import { Router } from "../router";
import { FDocument } from "./document";
import { Stack } from "./stack";
import { Task } from "./tasks";

type DocumentRegister = {
  document: FDocument,
  states: State[],
  effects: Effect[],
  computed: Computed[],
  router: Router
}

export class Registry {
  stack: Stack
  register: { [key: string]: DocumentRegister }

  constructor() {
    this.stack = new Stack();
    this.register = {}
  }

  registerStates(root: string, states: State[]) {
    if (!this.register[root].states) this.register[root].states = []
  }

  registerStateUpdate(state: State) {
    let root = Object.keys(this.register).find(r => this.register[r].states.some(s => s.state._id == state._id))
    if (root) {
      let fdocument = this.register[root].document
      let states = this.register[root].states.filter(s => s.state._id == state._id);
      for (let state of states) {
        let targetElement: FHTMLElement = state.element as FHTMLElement
        if (stateCall.element instanceof FlTextNode) {
          targetElement = stateCall.element.parentNode as FHTMLElement
        }
        let domUpdate = new FlDOMUpdate({ flDocument, state: stateCall.state, element: targetElement })
        this.runtime.pushTask(domUpdate);
      }
    }

    let computed = this.computed.find(e => e.states.some(s => s._id == state._id))
    if (computed) {
      let computedRefresh = new FlComputedRefresh(computed)
      this.runtime.pushTask(computedRefresh)
      let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state._id == computed._id))
      if (computedStateRoot) {
        let computedFlDocument = this.documentRootsMap[computedStateRoot]
        let computedStateCalls = this.documentStates[computedStateRoot].filter(s => s.state._id == computed._id);
        for (let computedStateCall of computedStateCalls) {
          let computedTargetElement: FHTMLElement = computedStateCall.element as FHTMLElement
          if (computedStateCall.element instanceof FlTextNode) {
            computedTargetElement = computedStateCall.element.parentNode as FHTMLElement
          }
          let computedDomUpdate = new FlDOMUpdate({ flDocument: computedFlDocument, state: computedStateCall.state, element: computedTargetElement })
          this.runtime.pushTask(computedDomUpdate)
        }
      }
    }

    let effect = this.effects.find(e => e.dependants.some(s => s._id == state._id))
    if (effect) {
      let effectCall = new FlEffectCall({ fn: effect.effect, dependents: effect.dependants })
      this.runtime.pushTask(effectCall)
    }
  }

  registerFlDocumentRoot(root: string, document: FlDocument) {
    if (!Object.keys(this.register).includes(root)) {
      this.register[root].document = document
    }
  }

  run() {
    this.stack.run()
  }

  registerEffect(effect: FlEffect) {
    if (!this.effects.some(e => e._id == effect._id))
      this.effects.push(effect)
  }

  registerComputedState(state: FlComputed) {
    if (!this.computed.some(c => c._id == state._id))
      this.computed.push(state);
  }

  registerActiveRouter(rootSelector: string, router: FlRouter) {
    if (!Object.keys(this.router).includes(rootSelector)) {
      this.router[rootSelector] = router
      this.registerRouteChange(window.location.href.slice(window.location.host.length + window.location.protocol.length + 2), rootSelector)
    }
  }

  registerRouteChange(path: string, rootSelector: string) {
    let args = { path, router: this.router[rootSelector], document: this.documentRootsMap[rootSelector] }
    console.log(args)
    let routeChangeTask = new FlRouteChange(args)
    this.runtime.pushTask(routeChangeTask)
  }

  getElementRootSelector(element: FElement, parent?: FHTMLElement): string | boolean {
    let rootSelector: string
    let doesHaveChild: boolean = false
    if (parent) {
      for (let child of parent.$children) {
        if (child.id == element.id) {
          doesHaveChild = true
        } else {
          if (child instanceof FHTMLElement) {
            doesHaveChild = this.getElementRootSelector(element, child) as boolean
          }
        }
      }
      return doesHaveChild
    } else {
      for (let selector of Object.keys(this.documentRootsMap)) {
        let selectedDocument = this.documentRootsMap[selector];
        for (let child of selectedDocument.rootElement.$children) {
          if (child.id == element.id) {
            rootSelector = selector
          } else {
            if (child instanceof FHTMLElement) {
              if (this.getElementRootSelector(element, child) == true) {
                rootSelector = selector
              }
            }
          }
        }
      }
      return rootSelector
    }
  }

  getRouterParams(): { [key: string]: string | number } {
    let routers = Object.keys(this.router).map(selector => this.router[selector])
    let params = {}
    for (let router of routers) {
      if (router.active.length > 0) {
        params = router.params
      }
    }
    return params
  }
}

export const Felin = new Registry()
