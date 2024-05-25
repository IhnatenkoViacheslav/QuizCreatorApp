import { FC, useContext, useState } from 'react'
import { MdClose, MdControlPoint } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import { QuizCreatorContext } from '../../../../context/QuizCreatorContext'
import Button from '../../../ui/button/Button'
import QuizOption from './QuizOption'
import { IQuestion } from './question.interface'

interface IQuizBuildQuestion {
	questionIndex: number
	question: IQuestion
}

const QuizBuildQuestion: FC<IQuizBuildQuestion> = ({
	question,
	questionIndex
}) => {
	const { setQuestions, questions } = useContext(QuizCreatorContext)
	const [points, setPoints] = useState<number | null>(null)

	const handleQuestionChange = (value: string) => {
		const newQuestions = [...questions]
		newQuestions[questionIndex].mainQuestion = value
		setQuestions(newQuestions)
	}

	const addOption = () => {
		const newQuestions = [...questions]
		newQuestions[questionIndex].answers.push({
			id: uuid(),
			answer: '',
			isCorrect: false
		})
		setQuestions(newQuestions)
	}

	const handlePointsChange = (value: string) => {
		const newValue = value.trim()
		const newPoints = newValue === '' ? null : Number(newValue)
		setPoints(newPoints)

		const newQuestions = [...questions]
		newQuestions[questionIndex].points = newPoints === null ? 1 : newPoints
		setQuestions(newQuestions)
	}

	const deleteQuestion = (question: IQuestion) => {
		const newQuestions = [...questions]
		const filteredQuestions = newQuestions.filter(q => question.id !== q.id)
		setQuestions(filteredQuestions)
	}

	return (
		<div className="border-2 border-primary rounded-xl py-2 px-6 shadow relative">
			{questionIndex > 0 && (
				<MdClose
					className="cursor-pointer absolute top-2 right-2 text-[#d020a6] hover:text-[#5a1e4c] transition-all"
					size={30}
					onClick={() => deleteQuestion(questions[questionIndex])}
				/>
			)}
			<div className=" flex justify-between items-center gap-10 py-2 px-4 ">
				<p className="text-sm">Question #{questionIndex + 1}</p>
				<input
					className="border-b-2 border-primary p-2 outline-none"
					placeholder="Write down a question"
					type="text"
					value={question.mainQuestion}
					onChange={e => handleQuestionChange(e.target.value)}
				/>
			</div>
			<div className="flex justify-between items-center py-2 px-4 gap-10 ">
				<p className="text-sm">Answers</p>
				<ul className="flex flex-col gap-2">
					{question.answers.map((answer, index) => (
						<QuizOption
							aIndex={index}
							qIndex={questionIndex}
							option={answer}
							key={index}
							questionIndex={question.id}
						/>
					))}
					{question.answers.length < 10 && (
						<Button onClick={() => addOption()}>
							<MdControlPoint size={15} color="white" />
							<p className="text-[14px]">Add option</p>
						</Button>
					)}
				</ul>
			</div>
			<div className="flex justify-between items-center py-2 px-4 gap-10 ">
				<p className="text-sm">Points</p>
				<input
					className="border-b-2 border-primary p-2 outline-none"
					type="number"
					onChange={e => handlePointsChange(e.target.value)}
					placeholder="Points for this question"
				/>
			</div>
		</div>
	)
}

export default QuizBuildQuestion
