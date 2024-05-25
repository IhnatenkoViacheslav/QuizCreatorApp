import { FC, PropsWithChildren } from 'react'
import { IButton } from './button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({ children, ...props }) => {
	return (
		<button
			{...props}
			style={{ minWidth: 100, maxWidth: 250 }}
			className="py-2 px-4 flex items-center justify-center gap-4 rounded-xl btn-grad shadow"
		>
			{children}
		</button>
	)
}

export default Button
