import { FC } from 'react'
import { IAnswer } from './answer.interface'

interface IQuizAnswer {
	answer: IAnswer
	selected: boolean
	onAnswerSelect: (isCorrect: boolean) => void
}

const Answer: FC<IQuizAnswer> = ({ answer, onAnswerSelect, selected }) => {
	return (
		<label className="flex p-4 items-center gap-4 border-2 border-primary 	w-full rounded-xl cursor-pointer">
			<input
				className="real_radio w-0 h-0 absolute"
				name="quiz_answer"
				type="radio"
				checked={selected}
				onClick={() => onAnswerSelect(answer.isCorrect)}
			/>
			<span className="w-4 h-4 bg-white border-4 border-primary rounded-full align-text-top fake_radio transition-all"></span>
			{answer.answer}
		</label>
	)
}

export default Answer
