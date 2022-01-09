import { Code } from './code/code'
import { Console } from './console/console'
import s from './editor.module.css'

export const Editor = () => {
  return (
    <div className={s.editor}>
      <Code />
      <Console />
    </div>
  )
}
