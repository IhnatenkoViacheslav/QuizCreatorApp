import { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import Layout from '../../ui/layout/Layout'
import Loader from '../../ui/loader/Loader'
import QuizItem from '../../ui/quiz-item/QuizItem'
import QuizStarter from '../../ui/quiz-item/QuizStarter'

const Quiz: FC = () => {
	const { quizId } = useParams<{ quizId: string }>()
	const { quizzes } = useContext(QuizCreatorContext)
	const { selectedQuiz, setSelectedQuiz } = useContext(QuizCreatorContext)
	const [quizStarted, setQuizStarted] = useState(false)

	useEffect(() => {
		const foundQuiz = quizzes.find(quiz => quiz.id === quizId)
		if (foundQuiz) {
			setSelectedQuiz(foundQuiz)
		}
	}, [quizId, quizzes])
	return (
		<Layout>
			{!selectedQuiz ? (
				<div className="justify-self-center mt-20">
					<Loader />
				</div>
			) : (
				<div className="pb-10 pt-10 px-16 w-1/3 justify-self-center flex flex-col gap-6 items-center border-2 border-primary rounded-xl bg-white shadow">
					{!quizStarted ? (
						<QuizStarter setQuizStarted={setQuizStarted} />
					) : (
						<QuizItem />
					)}
				</div>
			)}
		</Layout>
	)
}

export default Quiz
