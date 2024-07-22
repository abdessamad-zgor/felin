type DocumentRegister = {
      document: FDocument,
      states: State[],
      effects: Effect[],
      computed: Computed[],
      router: Router
    }
export class Registry {
  stack: Stack
  register:  { [key: string]: DocumentRegister}

  constructor() {
    this.stack = new Stack();
    this.register = {}
  }

  register(task: FlTask) {
    this.stack.push(task)
  }

  registerStates(root: string, states: State[]) {
    if(!this.register[root].states) this.register[root].states = []
  }

  registerStateUpdate(state: FlState) {
    let root = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state._id == state._id))
    if (root) {
      let fdocument = this.register[root].document
      let states = this.register[root].states.filter(s => s.state._id == state._id);
      for (let state of states) {
        let targetElement: FlHTMLElement = state.element as FlHTMLElement
        if (stateCall.element instanceof FlTextNode) {
          targetElement = stateCall.element.parentNode as FlHTMLElement
        }
        let domUpdate = new FlDOMUpdate({ flDocument, state: stateCall.state, element: targetElement })
        this.runtime.pushTask(domUpdate);
      }
    }

    let computed = this.computed.find(e=>e.states.some(s=>s._id==state._id))
    if(computed){
      let computedRefresh = new FlComputedRefresh(computed)
      this.runtime.pushTask(computedRefresh)
      let computedStateRoot = Object.keys(this.documentStates).find(r => this.documentStates[r].some(s => s.state._id == computed._id))
      if(computedStateRoot){
        let computedFlDocument = this.documentRootsMap[computedStateRoot]
        let computedStateCalls = this.documentStates[computedStateRoot].filter(s=>s.state._id == computed._id);
        for (let computedStateCall of computedStateCalls){
          let computedTargetElement: FlHTMLElement = computedStateCall.element as FlHTMLElement
          if(computedStateCall.element instanceof FlTextNode){
            computedTargetElement = computedStateCall.element.parentNode as FlHTMLElement
          }
          let computedDomUpdate = new FlDOMUpdate({flDocument: computedFlDocument, state: computedStateCall.state, element: computedTargetElement})
          this.runtime.pushTask(computedDomUpdate)
        }
      }
    }

    let effect = this.effects.find(e => e.dependants.some(s => s._id == state._id))
    if(effect){
      let effectCall = new FlEffectCall({ fn: effect.effect, dependents: effect.dependants })
      this.runtime.pushTask(effectCall)
    }
  }

  registerFlDocumentRoot(root: string, document: FlDocument) {
    if (!Object.keys(this.documentRootsMap).includes(root)) {
      this.documentRootsMap[root] = document
    }
  }

  run() {
    this.runtime.run()
  }

  registerEffect(effect: FlEffect) {
    if(!this.effects.some(e=>e._id==effect._id))
      this.effects.push(effect)
  }

  registerComputedState(state: FlComputed){
    if(!this.computed.some(c=>c._id == state._id))
      this.computed.push(state);
  }

  registerActiveRouter(rootSelector: string, router: FlRouter){
    if(!Object.keys(this.router).includes(rootSelector)){
      this.router[rootSelector] = router
      this.registerRouteChange(window.location.href.slice(window.location.host.length+window.location.protocol.length+2), rootSelector)
    }
  }

  registerRouteChange(path: string, rootSelector: string){
    let args = {path, router: this.router[rootSelector], document: this.documentRootsMap[rootSelector]}
    console.log(args)
    let routeChangeTask = new FlRouteChange(args)
    this.runtime.pushTask(routeChangeTask)
  }

  getElementRootSelector(element: FlElement, parent?: FlHTMLElement): string|boolean{
    let rootSelector: string
    let doesHaveChild: boolean = false
    if(parent){
      for(let child of parent.$children){
        if(child.id == element.id){
          doesHaveChild = true
        } else {
          if(child instanceof FlHTMLElement){
            doesHaveChild = this.getElementRootSelector(element, child) as boolean
          }
        }
      }
      return doesHaveChild
    } else {
      for(let selector of Object.keys(this.documentRootsMap)){
        let selectedDocument = this.documentRootsMap[selector];
        for(let child of selectedDocument.rootElement.$children){
          if(child.id == element.id){
            rootSelector = selector
          } else {
            if(child instanceof FlHTMLElement){
              if(this.getElementRootSelector(element, child) == true){
                rootSelector = selector
              }
            }
          }
        }
      }
      return rootSelector
    }
  }

  getRouterParams(): {[key: string]: string | number}{
    let routers = Object.keys(this.router).map(selector=>this.router[selector])
    let params = {}
    for(let router of routers){
      if(router.active.length>0){
        params = router.params
      }
    }
    return params
  }
}

export const Felin = new FlRegistry()
