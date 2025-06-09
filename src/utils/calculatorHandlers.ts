import { CalculatorStates } from '../types/types'
import { Operator } from '../types/types'
import { calculate } from './calculate'
import { clear } from './clear'
import { toggleSign } from './toggleSign'

export const calculatorHandlers = (states: CalculatorStates) => {
	
	const inputDigit = (digit: string) => {
		if (states.waitingForOperand) {
			states.setDisplay(digit)
			states.setWaitingForOperand(false)
		} else {
			states.setDisplay(prev => (prev === '0' ? digit : prev + digit))
		}
	}

	const inputDot = () => {
		if (states.waitingForOperand) {
			states.setDisplay('0.')
			states.setWaitingForOperand(false)
		} else if (!states.display.includes('.')) {
			states.setDisplay(prev => prev + '.')
		}
	}

	const performOperation = (nextOperator: Operator | string) => {
		if (states.display === 'Error') {
			clear(states)
			return
		}
		const inputValue = parseFloat(states.display)
		if (states.acc == null) {
			states.setAcc(inputValue)
		} else if (states.operator && states.operator !== '=') {
			const result = calculate(states.acc, inputValue, states.operator)
			states.setAcc(typeof result === 'number' ? result : null)
			states.setDisplay(result === 'Error' ? 'Error' : String(result))
		}
		states.setOperator(nextOperator as Operator)
		states.setWaitingForOperand(true)
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (
			e.ctrlKey ||
			e.altKey ||
			e.metaKey ||
			(e.key.length > 1 && e.key !== 'Enter' && e.key !== 'Escape')
		) {
			return
		}
		if (/\d/.test(e.key)) inputDigit(e.key)
		else if (e.key === '.') inputDot()
		else if (['+', '-', '*', '/'].includes(e.key)) performOperation(e.key)
		else if (e.key === 'Enter') performOperation('=')
		else if (e.key === 'Escape') clear(states)
	}

	const handleButtonClick = (value: string) => {
		if (/\d/.test(value)) inputDigit(value)
		else if (value === '.') inputDot()
		else if (value === 'AC') clear(states)
		else if (value === '+/-') toggleSign(states)
		else if (value === '=') performOperation('=')
		else performOperation(value)
	}
	return { handleKeyDown, handleButtonClick }
}
