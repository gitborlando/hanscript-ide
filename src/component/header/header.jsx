import logo from '../../asserts/logo.PNG'
import { CS } from '../../service/compileService'
import s from './header.module.css'

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.title}>
        <img src={logo} alt='汉简' className={s.logo} />
        <span className={s.info}>—— JavaSript 的中文 DSL</span>
      </div>
      <div className={s.run} onClick={() => CS.runCode()}>
        &#xe6c1;&nbsp;编译运行
      </div>
    </div>
  )
}
