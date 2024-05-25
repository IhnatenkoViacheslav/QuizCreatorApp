import { FC, useContext } from 'react'
import { MdControlPoint } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import Button from '../../ui/button/Button'
import Layout from '../../ui/layout/Layout'
import QuizList from './quiz-list/QuizList'

const Home: FC = () => {
	const { quizzes, searchTerm, setSearchTerm } = useContext(QuizCreatorContext)

	return (
		<Layout>
			<div className="w-full flex flex-col items-start mb-4 justify-self-start">
				<h2 className="p-2 font-bold mb-4 text-lg text-primary">
					{quizzes.length < 1 ? 'Create your first quiz' : 'All Quizzes'}
				</h2>
				<QuizList />
				<Link to="/creator">
					<Button>
						<MdControlPoint size={25} color="white" />
						Create new Quiz
					</Button>
				</Link>
			</div>
		</Layout>
	)
}

export default Home
