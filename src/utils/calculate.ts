	import { Operator } from '../types/types'
export const calculate = (
	a: number,
	b: number,
	op: Exclude<Operator, '=' | null>
): number | 'Error' => {
	switch (op) {
		case '+':
			return a + b
		case '-':
			return a - b
		case '*':
			return a * b
		case '÷':
			return b === 0 ? 'Error' : a / b
	}
}
