import { toggleTheme } from '../../utils/theme'
import { formatter, buttons } from '../../const/constans'
import { CalculatorStates } from '../../types/types'
import s from './Calculator.module.css'
import { Button } from '../ui/Button/Button'
import { getButtonVariant } from '../../utils/getButtonVariant'
const Calculator = ({
	handleButtonClick,
	states,
}: {
	handleButtonClick: (value: string) => void
	states: CalculatorStates
}) => {
	
	return (
		<>
			<section className={`${s.calculator} ${s[states.theme] || ''}`}>
				<button className={s.themeToggle} onClick={() => toggleTheme(states)}>
					{states.theme === 'light' ? '🌙' : '☀️'}
				</button>
				<div className={`${s.display} ${s[states.theme] || ''}`}>
					{isNaN(Number(states.display))
						? states.display
						: formatter.format(Number(states.display))}
				</div>
				<div className={s.buttons}>
					{buttons.map((btn, i) => (
						<Button
							className={btn === '0' ? 'zero' : ''}
							variant={getButtonVariant(btn)}
							key={i}
							onClick={() => handleButtonClick(btn)}
						>
							{btn}
						</Button>
					))}
				</div>
			</section>
		</>
	)
}

export default Calculator
