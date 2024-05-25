import { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { QuizCreatorContext } from '../../../../context/QuizCreatorContext'
import Button from '../../../ui/button/Button'
import { IQuiz } from '../../quiz/quiz.interface'

const QuizBuildTitle: FC = () => {
	const { name, time, setName, setTime, saveQuiz, questions, setQuestions } =
		useContext(QuizCreatorContext)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [tempTime, setTempTime] = useState<string>('60')

	useEffect(() => {
		setTempTime('60')
	}, [])

	const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
		const allQuestionsHaveCorrectAnswer = questions.every(q =>
			q.answers.some(a => a.isCorrect)
		)

		if (!allQuestionsHaveCorrectAnswer) {
			setErrorMessage('Each question must have at least one correct answer.')
			event.preventDefault()
			return
		}

		const newQuiz: IQuiz = {
			id: uuid(),
			name,
			time: Number(tempTime),
			statistics: {
				totalAnswers: 0,
				correctAnswers: 0
			},
			questions
		}
		saveQuiz(newQuiz)
		setName('')
		setTempTime('60')
		setErrorMessage('')
		setQuestions([
			{
				id: uuid(),
				mainQuestion: '',
				points: 1,
				answers: [
					{
						id: uuid(),
						answer: '',
						isCorrect: false
					},
					{
						id: uuid(),
						answer: '',
						isCorrect: false
					}
				]
			}
		])
	}

	const handleTimeChange = (value: string) => {
		if (/^\d*$/.test(value)) {
			setTempTime(value)
		}
	}

	return (
		<div className="flex flex-col gap-10 px-6 pt-10 pb-14">
			<label className="flex flex-col gap-4">
				<span className="text-tiny font-semibold">Write name of the Quiz:</span>
				<input
					className="border-b-2 border-primary p-2 outline-none"
					placeholder="Enter Quiz name..."
					value={name}
					type="text"
					onChange={e => setName(e.target.value)}
				/>
			</label>
			<label className="flex flex-col gap-4">
				<span className="text-tiny font-semibold">
					Set time given for Quiz:
				</span>
				<input
					className="border-b-2 border-primary p-2 outline-none"
					placeholder="Set time for the test(in minutes)..."
					value={tempTime}
					type="number"
					onChange={e => handleTimeChange(e.target.value)}
				/>
			</label>
			{errorMessage && <p>{errorMessage}</p>}
			<Link className="self-start" to="/">
				<Button onClick={e => handleSave(e)}>Save Quiz</Button>
			</Link>
		</div>
	)
}

export default QuizBuildTitle
