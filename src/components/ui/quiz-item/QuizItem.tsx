import { FC, useContext, useEffect, useState } from 'react'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import Timer from '../timer/Timer'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import QuizSubmit from './QuizSubmit'

const QuizItem: FC = () => {
	const [questionCounter, setQuestionCounter] = useState<number>(0)
	const [correctAnswers, setCorrectAnswers] = useState<number>(0)
	const [totalPoints, setTotalPoints] = useState<number>(0)
	const [score, setScore] = useState<number>(0)
	const [timeExpired, setTimeExpired] = useState<boolean>(false)
	const { selectedQuiz } = useContext(QuizCreatorContext)

	const totalQuestions = selectedQuiz!.questions.length

	useEffect(() => {
		setTotalPoints(0)
		setCorrectAnswers(0)
	}, [selectedQuiz])

	const handleAnswerSelect = (isCorrect: boolean, points: number) => {
		if (isCorrect) {
			setCorrectAnswers(prev => prev + 1)
			setTotalPoints(prev => prev + points)
		}
	}

	const handleNextQuestion = () => {
		setQuestionCounter(prev => prev + 1)
	}

	const handleSubmitQuiz = () => {
		const maxPoints = selectedQuiz!.questions.reduce(
			(acc, cur) => acc + cur.points,
			0
		)
		const finalScore = Math.round((totalPoints / maxPoints) * 100)
		setScore(finalScore)
		handleNextQuestion()
	}

	const handleTimeExpired = () => {
		setTimeExpired(true)
		handleSubmitQuiz()
	}

	return (
		<div className="flex flex-col gap-4 items-center relative px-10">
			{!timeExpired && questionCounter < totalQuestions && (
				<p className="text-xl font-semibold">
					Question: {questionCounter + 1} / {totalQuestions}
				</p>
			)}
			{!timeExpired && (
				<div className="absolute top-3 -right-16">
					<Timer
						onTimeExpired={handleTimeExpired}
						duration={selectedQuiz!.time}
					/>
				</div>
			)}
			{!timeExpired && questionCounter < selectedQuiz!.questions.length ? (
				<QuizQuestion
					question={selectedQuiz!.questions[questionCounter]}
					onAnswerSelect={handleAnswerSelect}
					onNextQuestion={handleNextQuestion}
					questionCounter={questionCounter}
					totalQuestions={totalQuestions}
				/>
			) : questionCounter === selectedQuiz!.questions.length ? (
				<QuizSubmit
					quizName={selectedQuiz!.name}
					handleSubmitQuiz={handleSubmitQuiz}
				/>
			) : (
				<QuizResult score={score} />
			)}
		</div>
	)
}

export default QuizItem
