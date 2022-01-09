import HanScript from 'hanscript'
import { makeAutoObservable } from 'mobx'

class CompileService {
  constructor() {
    this.code = ''
    this.result = null
    this.variables = []
    this.functions = []
    makeAutoObservable(this)
  }
  setCode(code) {
    this.code = code
  }
  setState(variables, functions) {
    this.variables = variables
    this.functions = functions
  }
  runCode() {
    window.consoleMirror.setValue('')
    const that = this
    HanScript.run(this.code, {
      打印: that.consoleLog,
      dy: that.consoleLog,
    })
  }
  consoleLog(toLog) {
    let lastRest = window.consoleMirror.getValue()
    lastRest += lastRest ? '\n' : ''
    window.consoleMirror.setValue(lastRest + JSON.stringify(toLog))
  }
}

export const CS = new CompileService()
