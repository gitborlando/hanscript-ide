import './body.css'
import { Editor } from './editor/editor'
import { Panel } from './panel/panel'

export const Body = () => {
  return (
    <div className='body'>
      <Panel />
      <Editor />
    </div>
  )
}
