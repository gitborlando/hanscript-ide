import { makeAutoObservable } from 'mobx'

class PanelService {
  constructor() {
    this.show = true
    this.order = 1
    makeAutoObservable(this)
  }
  setShow(show) {
    this.show = show
  }
  setOrder(order) {
    this.order = order
  }
}

export const PS = new PanelService()
