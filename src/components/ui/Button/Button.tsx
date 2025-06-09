import s from './Button.module.css'
import { IButtonProps } from '../../../types/types'
import { FC } from 'react'

export const Button: FC<IButtonProps> = ({
	children,
	variant,
	onClick,
	style,
	className,
}) => {
	return (
		<>
			<button
				style={style}
				onClick={onClick}
				className={`${s.button} ${s[variant]} ${s[className] || ''}`}
			>
				{children}
			</button>
		</>
	)
}
