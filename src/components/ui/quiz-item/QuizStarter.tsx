import { FC, SetStateAction, useContext } from 'react'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import Button from '../button/Button'

interface IQuizStarter {
	setQuizStarted: React.Dispatch<SetStateAction<boolean>>
}

const QuizStarter: FC<IQuizStarter> = ({ setQuizStarted }) => {
	const { selectedQuiz } = useContext(QuizCreatorContext)

	return (
		<>
			<h2 className="text-xl font-semibold">{selectedQuiz?.name}</h2>
			<p className="text-base font-semibold">You are going to start test</p>
			<div className="self-start">
				<p className="">Time: {selectedQuiz?.time} minutes</p>
				<p>Questions: {selectedQuiz?.questions.length}</p>
			</div>
			<Button onClick={() => setQuizStarted(true)}>Start</Button>
		</>
	)
}

export default QuizStarter
