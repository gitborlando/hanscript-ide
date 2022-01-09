import CodeMirror from 'codemirror'
import './codeMirror.css'

window.consoleMirror = CodeMirror.fromTextArea(
  document.getElementById('console')
)
