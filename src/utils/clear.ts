import { CalculatorStates } from '../types/types'

export const clear = (states: CalculatorStates) => {
	states.setDisplay('0')
	states.setAcc(null)
	states.setOperator(null)
	states.setWaitingForOperand(false)
}
