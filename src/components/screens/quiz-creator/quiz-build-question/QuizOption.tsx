import { FC, useContext } from 'react'
import { MdCheckCircle, MdDelete } from 'react-icons/md'
import { QuizCreatorContext } from '../../../../context/QuizCreatorContext'
import { IOption } from './option.interface'

interface IQuestionOptions {
	aIndex: number
	qIndex: number
	option: IOption
	questionIndex: string
}

const QuizOption: FC<IQuestionOptions> = ({
	aIndex,
	qIndex,
	option,
	questionIndex
}) => {
	const { questions, setQuestions } = useContext(QuizCreatorContext)

	const handleOptionChange = (value: string) => {
		const newQuestions = [...questions]
		newQuestions[qIndex].answers[aIndex].answer = value
		setQuestions(newQuestions)
	}

	const handleIsCorrectOption = () => {
		const newQuestions = [...questions]
		newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((a, i) =>
			i === aIndex ? { ...a, isCorrect: true } : { ...a, isCorrect: false }
		)
		setQuestions(newQuestions)
	}

	const deleteOption = (optionId: string, questionId: string) => {
		setQuestions(prevQ =>
			prevQ.map(question => {
				if (question.id === questionId) {
					const newOptions = question.answers.filter(a => a.id !== optionId)
					return { ...question, answers: newOptions }
				}
				return question
			})
		)
	}

	return (
		<li className="relative">
			<label>
				<input
					className="border-b-2 border-primary px-2 pt-2 pb-1 outline-none"
					placeholder="Write answer"
					type="text"
					value={option.answer}
					onChange={e => handleOptionChange(e.target.value)}
				/>
			</label>
			<MdCheckCircle
				className="absolute -left-7 top-2 cursor-pointer"
				color={option.isCorrect ? '#1ED760' : '#C1C1C1'}
				size={25}
				onClick={() => handleIsCorrectOption()}
			/>
			{aIndex > 0 && (
				<MdDelete
					className="cursor-pointer absolute -right-6 top-2 text-[#d020a6] hover:text-[#5a1e4c] transition-all"
					size={25}
					onClick={() => deleteOption(option.id, questionIndex)}
				/>
			)}
		</li>
	)
}

export default QuizOption
