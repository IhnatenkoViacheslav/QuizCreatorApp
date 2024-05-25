import { FC, useEffect, useState } from 'react'
import { IQuestion } from '../../screens/quiz-creator/quiz-build-question/question.interface'
import Answer from './Answer'
import { IAnswer } from './answer.interface'

interface IQuizQuestion {
	question: IQuestion
	questionCounter: number
	totalQuestions: number
	onAnswerSelect: (isCorrect: boolean, points: number) => void
	onNextQuestion: () => void
}

const QuizQuestion: FC<IQuizQuestion> = ({
	question,
	onAnswerSelect,
	onNextQuestion,
	questionCounter,
	totalQuestions
}) => {
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

	useEffect(() => {
		setSelectedAnswer(null)
	}, [questionCounter])

	const handleAnswerClick = (
		isCorrect: boolean,
		answer: IAnswer,
		points: number
	) => {
		setSelectedAnswer(answer.id)
		onAnswerSelect(isCorrect, points)
	}

	return (
		<>
			<h2 className="text-tiny">{question.mainQuestion}</h2>
			<div className="flex items-start flex-col gap-4 w-full">
				{question.answers.map((answer, index) => (
					<Answer
						key={index}
						answer={answer}
						selected={selectedAnswer === answer.id}
						onAnswerSelect={isCorrect =>
							handleAnswerClick(isCorrect, answer, question.points)
						}
					/>
				))}
			</div>
			<button
				disabled={!selectedAnswer}
				onClick={() => onNextQuestion()}
				className="py-2 px-4 rounded-xl btn-grad w-24"
			>
				{questionCounter + 1 < totalQuestions ? 'Next' : 'Finish'}
			</button>
		</>
	)
}

export default QuizQuestion
