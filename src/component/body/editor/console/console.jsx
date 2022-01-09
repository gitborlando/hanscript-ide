import { useEffect } from 'react'
import s from './console.module.css'

export const Console = () => {
  useEffect(() => import('./consoleMirror/consoleMirror'))
  return (
    <div className={s.console}>
      <textarea id='console'></textarea>
    </div>
  )
}
