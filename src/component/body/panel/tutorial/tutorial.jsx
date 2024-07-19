import MarkdownIt from 'markdown-it'
import { observer } from 'mobx-react'
import { Suspense, useEffect, useState } from 'react'
import { PS } from '../../../../service/panelService'
import './github-light.css'
import './tutorial.css'

export const Tutorial = observer(({ order }) => {
	const markdown = new MarkdownIt({ breaks: true })
	const [html, setHtml] = useState('')
	useEffect(() => {
		// const fetchData = async () => {
		// 	const tutorialResult = await fetch(apiPath + 'tutorial')
		// 	const tutorial = await tutorialResult.text()
		// 	setHtml(markdown.render(tutorial))
		// }
		// fetchData()
		setHtml(markdown.render(tutorialStr))
	}, [markdown])
	return (
		<>
			{PS.order === order && (
				<Suspense fallback={'loading'}>
					<div
						className='markdown-body'
						dangerouslySetInnerHTML={{
							__html: html,
						}}></div>
				</Suspense>
			)}
		</>
	)
})

const tutorialStr = `# 汉简
> 是 JavaScript 的中文 DSL, 通俗来讲就是方言

### 1. 表达方式
\`\`\`js
123
\`\`\`

表示数字 123，可以加减，比如 10 + 5 为 15

\`\`\`js
是， 否， yes， no
\`\`\`

表示逻辑上的“是或者不是，行或者不行”的意思

\`\`\`js
''，""，“”，‘’
\`\`\`

所有用引号括起来的东西，表示除了上述的一般的自然语言类型，例如’李白‘，’打野‘，’很菜‘。可以拼接，例如 ’鲁班‘ + ’很脆‘ 为 ’鲁班很脆‘

\`\`\`js
（‘亚瑟’，‘妲己’，13888）
\`\`\`

像这样的表示 “列表”

\`\`\`js
（
  名字 = ‘鲁班’，价格 = 8888
）
\`\`\`

像这样就表示一个有各种特性的实体，一般叫做 “对象”，上述例子就表达的是一个名字叫鲁班然后卖8888金币的东西

### 2. 标记

\`\`\`js
鲁班 = （
  名字 = ‘鲁班’，价格 = 8888
）
\`\`\`

上面说的那个 “一个名字叫鲁班然后卖8888金币的东西” 使用起来实在是不方便，如果你写的程序要不止一次用到这个 “名字叫鲁班然后卖8888金币的东西” 的话，不妨给它一个标记， 就叫 鲁班，此鲁班和彼 “鲁班” 并非同一鲁班，所有不带引号的中文字（或者英文， 或者中英混合，或者中英数字混合）都是一个 标记，表示各种各样的东西`
