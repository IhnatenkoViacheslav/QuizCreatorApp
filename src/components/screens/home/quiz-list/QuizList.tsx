import { useContext } from 'react'
import { QuizCreatorContext } from '../../../../context/QuizCreatorContext'
import ListItem from '../../../ui/list-item/ListItem'

const QuizList = () => {
	const { quizzes, searchTerm, setSearchTerm } = useContext(QuizCreatorContext)

	const filteredQuizzes = quizzes.filter(quiz =>
		quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
	)
	return (
		<>
			{filteredQuizzes.length >= 1 && (
				<div className="mb-4 grid grid-cols-5 gap-4">
					{filteredQuizzes.map((quiz, index) => (
						<ListItem quiz={quiz} key={index} />
					))}
				</div>
			)}
		</>
	)
}

export default QuizList
