import MarkdownIt from 'markdown-it'
import { observer } from 'mobx-react'
import { Suspense, useEffect, useState } from 'react'
import { apiPath } from '../../../..'
import { PS } from '../../../../service/panelService'
import './github-light.css'
import './tutorial.css'

export const Tutorial = observer(({ order }) => {
  const markdown = new MarkdownIt({ breaks: true })
  const [html, setHtml] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const tutorialResult = await fetch(apiPath + 'tutorial')
      const tutorial = await tutorialResult.text()
      setHtml(markdown.render(tutorial))
    }
    fetchData()
  }, [])
  return (
    <>
      {PS.order === order && (
        <Suspense fallback={'loading'}>
          <div
            className='markdown-body'
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          ></div>
        </Suspense>
      )}
    </>
  )
})
