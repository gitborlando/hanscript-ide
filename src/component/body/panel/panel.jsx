import { PS } from '../../../service/panelService'
import './panel.css'
import { Switch, switchCase } from './switch/switch'

export const Panel = () => {
  return (
    <>
      {PS.show && (
        <div className='panel'>
          {switchCase.map((item, index) => (
            <item.component key={index} order={index} />
          ))}
          <Switch />
        </div>
      )}
    </>
  )
}
