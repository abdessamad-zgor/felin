import { ComputedRefresh, DOMUpdate, EffectCall, RouteChange, Task } from "./tasks";

function quickSortByPriority(array: Task[]) {
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

export class Stack {
  tasks: Task[] = []
  running: boolean = false
  constructor() {
  }

  pop(): Task {
    if (this.tasks.length > 0) {
      let highestPriorityTask = this.tasks[0]
      this.tasks = this.tasks.slice(1)
      return highestPriorityTask
    }
  }

  push(task: Task) {
    this.tasks.push(task)
    this.tasks = quickSortByPriority(this.tasks)
    if (!this.running) this.run()
  }

  empty() {
    return this.tasks.length == 0
  }

  run() {
    if (!this.running) this.running = true
    while (this.running) {
      if (this.empty()) {
        this.running = false
        break;
      }
      let task = this.pop()
      if (task instanceof DOMUpdate) {
        task.call(task.args)
      } else if (task instanceof ComputedRefresh) {
        task.call(task.args)
      } else if (task instanceof EffectCall) {
        task.call(task.args)
      } else if (task instanceof RouteChange) {
        task.call(task.args)
      }
    }
  }
}
