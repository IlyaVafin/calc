import { useState } from 'react'
import { Operator } from '../types/types'
export const useStatesCalculator = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	const [display, setDisplay] = useState<string>('0')
	const [acc, setAcc] = useState<number | null>(null)
	const [operator, setOperator] = useState<Operator>(null)
	const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false)
	return {
		theme,
		setTheme,
		display,
		setDisplay,
		acc,
		setAcc,
		operator,
		setOperator,
		waitingForOperand,
		setWaitingForOperand,
	}
}
