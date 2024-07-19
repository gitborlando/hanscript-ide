import { useEffect } from 'react'
import s from './code.module.css'

export const Code = () => {
	useEffect(() => import('./codeMirror/codeMirror'))
	return (
		<div className={s.code}>
			<textarea id='textarea' placeholder='...这里可以打代码'></textarea>
		</div>
	)
}
