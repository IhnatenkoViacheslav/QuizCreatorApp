import { Route, Routes } from 'react-router-dom'
import Home from './components/screens/home/Home'
import QuizCreator from './components/screens/quiz-creator/QuizCreator'
import Quiz from './components/screens/quiz/Quiz'

export default function App() {
	return (
		<Routes>
			<Route path="/" Component={Home} />
			<Route path="/quiz/:quizId" Component={Quiz} />
			<Route path="/creator" Component={QuizCreator} />
			<Route path="/edit-quiz/:quizId" element={<QuizCreator editMode />} />
		</Routes>
	)
}
