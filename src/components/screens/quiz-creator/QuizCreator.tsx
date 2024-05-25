import { FC, useContext, useEffect } from 'react'
import { MdControlPoint } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import Button from '../../ui/button/Button'
import Layout from '../../ui/layout/Layout'
import QuizBuildQuestion from './quiz-build-question/QuizBuildQuestion'
import { IQuestion } from './quiz-build-question/question.interface'
import QuizBuildTitle from './quiz-build-title/QuizBuildTitle'

const QuizCreator: FC<{ editMode?: boolean }> = ({ editMode }) => {
	const { questions, setQuestions, setSelectedQuiz, quizzes } =
		useContext(QuizCreatorContext)
	const { quizId } = useParams()

	useEffect(() => {
		if (editMode && quizId) {
			const quiz = quizzes.find(quiz => quiz.id === quizId)
			if (quiz) {
				setSelectedQuiz(quiz)
				setQuestions(quiz.questions)
			}
		}
	}, [editMode, quizId, quizzes])

	const addQuestion = () => {
		const newQuestion: IQuestion = {
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
		setQuestions(prev => [...prev, newQuestion])
	}

	return (
		<Layout>
			<h1 className="text-xl font-semibold text-primary mb-4">
				Create your own quiz
			</h1>
			<div className="grid grid-cols-3 gap-10 justify-between border-2 border-primary rounded-xl">
				<QuizBuildTitle />
				<div className="flex flex-col gap-4 justify-self-start items-around col-span-2 px-6 pt-10 pb-14 ">
					<p className="text-tiny font-semibold">List of questions</p>
					<div className="grid grid-cols-2 gap-6">
						{questions.map((question, index) => (
							<QuizBuildQuestion
								key={index}
								questionIndex={index}
								question={question}
							/>
						))}
					</div>
					<Button onClick={addQuestion}>
						<MdControlPoint size={25} color="white" />
						Add new question
					</Button>
				</div>
			</div>
		</Layout>
	)
}

export default QuizCreator
