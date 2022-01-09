import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { apiPath } from '../../../..'
import { PS } from '../../../../service/panelService'
import s from './example.module.css'

window.selectedExample = null

export const Example = observer(({ order }) => {
  const [examples, setExamples] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const exampleResult = await fetch(apiPath + 'example')
      setExamples(await exampleResult.json())
    }
    fetchData()
  }, [])
  return (
    <>
      {PS.order === order && (
        <div className={s.example}>
          {examples.map((example, index) => (
            <ExampleCard key={index} example={example} index={index} />
          ))}
        </div>
      )}
    </>
  )
})

const ExampleCard = ({ example: { name, code }, index }) => {
  const handleOnClick = () => {
    window.codeMirror.setValue(code)
    window.selectedExample = index
  }
  return (
    <div
      className={[
        s.exampleCard,
        window.selectedExample === index ? s.selected : '',
      ].join(' ')}
      onClick={handleOnClick}
    >
      <div className={s.index}>{index + 1}.&nbsp;</div>
      <div className={s.name}>{name}</div>
    </div>
  )
}
