import { useEffect } from 'react'
import { useStatesCalculator } from './hooks/useStatesCalculator'
import { calculate } from './utils/calculate'
import { Operator } from './types/types'
import { clear } from './utils/clear'
import { toggleSign } from './utils/toggleSign'
import './App.css'
import Calculator from './components/Calculator/Calculator'
const App = () => {
	const states = useStatesCalculator() // состояния калькулятора :)

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

	useEffect(() => {
		const listener = (e: KeyboardEvent) => handleKeyDown(e)
		document.addEventListener('keydown', listener)
		return () => document.removeEventListener('keydown', listener)
	}, [handleKeyDown])

	useEffect(() => {
		document.body.className =
			states.theme === 'light' ? 'lightTheme' : 'darkTheme'
	}, [states.theme])

	return (
    <Calculator states={states}  handleButtonClick={handleButtonClick}/>
	)
}

export default App
