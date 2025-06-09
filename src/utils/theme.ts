import { CalculatorStates } from "../types/types"
export const toggleTheme = (states: CalculatorStates) => {
	states.setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
}
