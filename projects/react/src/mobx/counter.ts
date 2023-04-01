import { makeAutoObservable, action } from 'mobx'

export class Counter {
  count = 0
  constructor() {
    makeAutoObservable(this)
  }
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
  async changeLazy() {
    setTimeout(
      action(() => {
        this.count = Math.floor(Math.random() * 100)
      }),
      1000,
    )
  }
  get double() {
    return this.count * 2
  }
}

export const counterStore = new Counter()
