import { Dispatch, SetStateAction, CSSProperties, MouseEventHandler, ReactNode } from "react"


export  type Operator = '+' | '-' | '*' | '÷' | '=' | null


export interface CalculatorStates {
  display: string
  setDisplay: Dispatch<SetStateAction<string>>
  acc: number | null
  setAcc: Dispatch<SetStateAction<number | null>>
  operator: Operator | null
  setOperator: Dispatch<SetStateAction<Operator | null>>
  waitingForOperand: boolean
  setWaitingForOperand: Dispatch<SetStateAction<boolean>>
	setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
	theme: 'light' | 'dark'
}


export interface IButtonProps {
  children: ReactNode
  variant: 'orange' | 'gray' | 'black'
  onClick: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
  className: string
}

