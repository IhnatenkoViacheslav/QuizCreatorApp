import { FC, PropsWithChildren } from 'react'
import Header from './Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<main className="px-6 pb-6 pt-2 w-full grid">{children}</main>
		</>
	)
}

export default Layout
