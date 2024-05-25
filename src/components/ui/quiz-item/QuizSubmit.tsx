import { FC } from 'react'

interface IQuizSubmit {
	quizName: string
	handleSubmitQuiz: () => void
}

const QuizSubmit: FC<IQuizSubmit> = ({ handleSubmitQuiz, quizName }) => {
	return (
		<>
			<p className="text-xl font-semibold mb-4">Summary</p>
			<h2 className="text-tiny mb-2">You are going to finish test:</h2>
			<span className="font-semibold text-lg">{quizName}</span>
			<button
				className="py-2 px-4 rounded-xl btn-grad w-24"
				onClick={() => handleSubmitQuiz()}
			>
				Submit
			</button>
		</>
	)
}

export default QuizSubmit
