import { ComputedRefresh, DOMUpdate, EffectCall, InitEffectRegistry, InitComputedRegistry, Task, RouteChange } from "./tasks";
import { FText, FHTMLElement, FSVGElement, FElement } from "../elements/element";
import { Computed } from "../primitives/computed";
import { Effect } from "../primitives/effect";
import { State } from "../primitives/state";
import { Router } from "../router";
import { FDocument } from "./document";
import { Stack } from "./stack";

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

  initEffectRegistry(effect: Effect){
    let root = Object.keys(this.register).find(r=>effect.states.map(s=>s._id).some(s_id=>this.register[r].states.map(s=>s._id).includes(s_id)))
    if(root){
      if(!this.register[root].effects) this.register[root].effects = []
      this.register[root].effects.push(effect)
    } else {
      this.stack.push(new InitEffectRegistry(effect))
    }
  }
  
  initComputedRegistry(computed: Computed){
    let root = Object.keys(this.register).find(r=>computed.states.map(s=>s._id).some(s_id=>this.register[r].states.map(s=>s._id).includes(s_id)))
    if(root){
      if(!this.register[root].computed) this.register[root].computed = []
      this.register[root].computed.push(computed)
    } else {
      this.stack.push(new InitComputedRegistry(computed))
    }
  }

  registerStates(root: string, states: State[]) {
    this.register[root].states = states
  }

  registerStateUpdate(state: State) {
    let root = Object.keys(this.register).find(r => this.register[r].states.some(s => s._id == state._id))
    if (root) {
      let fdocument = this.register[root].document
      let states = this.register[root].states.filter(s => s._id == state._id);
      for (let state of states) {
      let targets = state.elements as FElement[]
        for(let target of targets){
          if (target instanceof FText) {
            target = target.parent as FHTMLElement
          }
          let domUpdate = new DOMUpdate({ document: fdocument, state: state})
          this.stack.push(domUpdate);
        }
      }
      let computed = this.register[root].computed.find(e => e.states.some(s => s._id == state._id))
      if (computed) {
        let computedRefresh = new ComputedRefresh(computed)
        this.stack.push(computedRefresh)
        let cStates = this.register[root].computed.filter(s => s._id == computed._id);
        for (let cState of cStates) {
          let cTargets = cState.elements as FElement[]
          for(let cTarget of cTargets){
            if (cTarget instanceof FText) {
              cTarget = cTarget.parent as FHTMLElement
            }
            let computedDomUpdate = new DOMUpdate({ document: fdocument, state: cState })
            this.stack.push(computedDomUpdate)
          }
        }
      }

      let effect = this.register[root].effects.find(e => e.states.some(s => s._id == state._id))
      if (effect) {
        let effectCall = new EffectCall(effect)
        this.stack.push(effectCall)
      }
    }

  }

  registerFlDocumentRoot(root: string, document: FDocument) {
    if (!Object.keys(this.register).includes(root)) {
      this.register[root] = {} as DocumentRegister
    }
    this.register[root].document = document
  }

  run() {
    this.stack.run()
  }

  registerEffect(effect: Effect) {
    let initTask = new InitEffectRegistry(effect)
    setTimeout(() => {
      this.stack.push(initTask)
    }, 1000);
  }

  registerComputed(computed: Computed){
    let initTask = new InitComputedRegistry(computed)
    setTimeout(() => {
      this.stack.push(initTask)
    }, 1000);
  }

  registerActiveRouter(rootSelector: string, router: Router) {
    if (!Object.keys(this.register).includes(rootSelector)) {
      this.register[rootSelector] = {} as DocumentRegister
    }
    this.register[rootSelector].router = router
    this.registerRouteChange(window.location.href.slice(window.location.host.length + window.location.protocol.length + 2), rootSelector)
  }

  registerRouteChange(path: string, rootSelector: string) {
    let args = { path, router: this.register[rootSelector].router, document: this.register[rootSelector].document }
    let routeChangeTask = new RouteChange(args)
    this.stack.push(routeChangeTask)
  }

  getElementRootSelector(element: FElement, parent?: FHTMLElement): string | boolean {
    let rootSelector: string
    let doesHaveChild: boolean = false
    if (parent) {
      for (let child of parent._children) {
        if (child._id == element._id) {
          doesHaveChild = true
        } else {
          if (child instanceof FHTMLElement) {
            doesHaveChild = this.getElementRootSelector(element, child) as boolean
          }
        }
      }
      return doesHaveChild
    } else {
      for (let selector of Object.keys(this.register)) {
        let selectedDocument = this.register[selector].document;
        for (let child of selectedDocument.rootElement._children) {
          if (child._id == element._id) {
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
    let routers = Object.keys(this.register).map(selector => this.register[selector].router)
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
