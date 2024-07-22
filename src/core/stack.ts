function quickSortByPriority(array: FlTask[]) {
  if (array.length <= 1) {
    return array;
  }

  let pivot = array[0];
  let left = [];
  let right = [];

  for (let i = 1; i < array.length; i++) {
    array[i].priority < pivot.priority ? left.push(array[i]) : right.push(array[i]);
  }
  return quickSortByPriority(left).concat(pivot, quickSortByPriority(right));
};

export class FlStack {
  tasks: FlTask[] = []
  constructor() {
  }

  pop(): FlTask {
    if (this.tasks.length > 0) {
      let highestPriorityTask = this.tasks[0]
      this.tasks = this.tasks.slice(1)
      return highestPriorityTask
    }
  }

  push(task: FlTask) {
    this.tasks.push(task)
    this.tasks = quickSortByPriority(this.tasks)
  }

  empty() {
    return this.tasks.length == 0
  }
}

export class FlRuntime {
  stack: FlStack
  running: boolean

  constructor() {
    this.stack = new FlStack()
    this.running = true
  }

  run() {
    if (!this.running) this.running = true
    while (this.running) {
      if (this.stack.empty()) {
        this.running = false
        break;
      }
      let task = this.stack.pop()
      if (task instanceof FlDOMUpdate) {
        task.call(task.args)
      } else if (task instanceof FlComputedRefresh) {
        task.call(task.args)
      } else if (task instanceof FlEffectCall) {
        task.call(task.args)
      } else if (task instanceof FlRouteChange) {
        task.call(task.args)
      }
    }
  }

  pushTask(task: FlTask) {
    this.stack.push(task)
    if (!this.running) this.run()
  }
}
