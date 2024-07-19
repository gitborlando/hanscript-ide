import { observer } from 'mobx-react'
import { PS } from '../../../../service/panelService'
import s from './example.module.css'

const examples = [
	{
		name: '冒泡排序',
		code: `数组 = （5，3，2，4，8，9，7，6，1）

冒泡排序（）{
  循环 a=0~长度（数组） {
    循环 b=a+1~长度（数组） {
      如果 数组#a 》 数组#b {
        （数组#a， 数组#b）= （数组#b， 数组#a）
      }
  	}
  }
  打印（数组）
}

冒泡排序（）`,
	},
]

window.selectedExample = null

export const Example = observer(({ order }) => {
	// const [examples, setExamples] = useState([exampleStr])
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const exampleResult = await fetch(apiPath + 'example')
	// 		setExamples(await exampleResult.json())
	// 	}
	// 	fetchData()
	// }, [])
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
			className={[s.exampleCard, window.selectedExample === index ? s.selected : ''].join(' ')}
			onClick={handleOnClick}>
			<div className={s.index}>{index + 1}.&nbsp;</div>
			<div className={s.name}>{name}</div>
		</div>
	)
}
