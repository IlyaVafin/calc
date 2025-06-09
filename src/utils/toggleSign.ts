import { CalculatorStates } from '../types/types'

export const toggleSign = (states: CalculatorStates) => {
	states.setDisplay(prev =>
		prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev
	)
}
