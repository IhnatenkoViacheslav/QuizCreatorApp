import { FC, useEffect, useState } from 'react'
import { MdTimer } from 'react-icons/md'

interface ITimerProps {
	onTimeExpired: () => void
	duration: number
}

const Timer: FC<ITimerProps> = ({ duration, onTimeExpired }) => {
	const [timer, setTimer] = useState<number>(duration * 60)

	useEffect(() => {
		if (timer <= 0) {
			onTimeExpired()
		} else {
			const timer = setInterval(() => {
				setTimer(prevSeconds => prevSeconds - 1)
			}, 1000)

			return () => clearInterval(timer)
		}
	}, [timer, onTimeExpired])

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
	}

	return (
		<div className="flex gap-2 items-center">
			<MdTimer size={25} color="#9733ee" />
			{formatTime(timer)}
		</div>
	)
}

export default Timer
