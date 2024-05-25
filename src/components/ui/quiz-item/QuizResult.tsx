import { FC } from 'react'
import { Link } from 'react-router-dom'

const QuizResult: FC<{ score: number }> = ({ score }) => {
	let result: string | number = Math.ceil(score)

	if (score < 30) {
		result = 'Learn more and go back'
	} else if (score < 50) {
		result = 'Not bad, but you could do it better'
	} else if (score < 70) {
		result = 'Good result!'
	} else {
		result = 'Excellent!'
	}

	return (
		<>
			<p className="text-xl font-semibold mb-10">Your Result Is: {score} %</p>
			<h2 className="text-lg text-primary mb-10">{result}</h2>
			<Link className="py-2 px-4 rounded-xl btn-grad w-24" to="/">
				Return
			</Link>
		</>
	)
}

export default QuizResult
