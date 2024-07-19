import { observer } from 'mobx-react'
import { PS } from '../../../../service/panelService'
import { Example } from '../example/example'
import { Tutorial } from '../tutorial/tutorial'
import './switch.css'

export const switchCase = [
	{ name: '教程', icon: '&#xe78d;', component: Tutorial },
	{ name: '例子', icon: '&#xe658;', component: Example },
	// { name: '评论', icon: '&#xe603;', component: Comment },
]

export const Switch = observer(() => {
	return (
		<div className='switch'>
			{switchCase.map((item, index) => (
				<div
					draggable={false}
					key={index}
					className={`switchItem center pointer ${PS.order === index ? 'selected' : ''}`}
					onClick={() => PS.setOrder(index)}>
					<div className='switchIcon'>
						<div className='icon' dangerouslySetInnerHTML={{ __html: item.icon }}></div>
						<div className='text'>{item.name}</div>
					</div>
				</div>
			))}
		</div>
	)
})
