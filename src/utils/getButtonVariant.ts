import { Operator } from '../types/types'
export const getButtonVariant = (val: string): 'orange' | 'black' | 'gray' => {
	const operators = new Set<Operator>(['+', '-', '*', '÷', '='])
	if (operators.has(val as Operator)) return 'orange'
	if (val === 'AC' || val === '+/-' || val === '%') return 'gray'
	return 'black'
}
