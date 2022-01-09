import CodeMirror from 'codemirror'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/mode/simple'
import HanScript from 'hanscript'
import { CS } from '../../../../../service/compileService'
import './codeMirror.css'
import './highlight'

const codeMirror = (window.codeMirror = CodeMirror.fromTextArea(
  document.getElementById('textarea'),
  {
    mode: 'simplemode',
    autoCloseBrackets: true,
  }
))
codeMirror.on('change', () => {
  CS.setCode(HanScript.compile(codeMirror.getValue()))
})
// HanScript.onComplete(({ variables, functions }) => {
//   CS.setState(variables, functions)
// })
