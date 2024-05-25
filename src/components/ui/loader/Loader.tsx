import { FC } from 'react'
import { BallTriangle } from 'react-loader-spinner'

const Loader: FC = () => {
	return (
		<BallTriangle height="80" width="80" color="#9733ee" ariaLabel="loading" />
	)
}

export default Loader
