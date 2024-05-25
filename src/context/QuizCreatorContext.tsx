import {
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useEffect,
	useState
} from 'react'
import { v4 as uuid } from 'uuid'
import { IQuestion } from '../components/screens/quiz-creator/quiz-build-question/question.interface'
import { IQuiz } from '../components/screens/quiz/quiz.interface'

interface IQuizCreatorContext {
	quizzes: IQuiz[]
	selectedQuiz: IQuiz | null
	setSelectedQuiz: React.Dispatch<SetStateAction<IQuiz | null>>
	name: string
	setName: React.Dispatch<SetStateAction<string>>
	time: number
	setTime: React.Dispatch<SetStateAction<number>>
	questions: IQuestion[]
	setQuestions: React.Dispatch<SetStateAction<IQuestion[]>>
	saveQuiz: (newQuiz: IQuiz) => void
	correctAnswers: number
	setCorrectAnswers: React.Dispatch<SetStateAction<number>>
	deleteQuiz: (quizId: string) => void
	updateQuiz: (updatedQuiz: IQuiz) => void
	searchTerm: string
	setSearchTerm: React.Dispatch<SetStateAction<string>>
}

export const QuizCreatorContext = createContext<IQuizCreatorContext>(
	{} as IQuizCreatorContext
)

export const QuizCreatorContextProvider: FC<PropsWithChildren> = ({
	children
}) => {
	const [quizzes, setQuizzes] = useState<IQuiz[]>([])
	const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | null>(null)
	const [name, setName] = useState<string>('')
	const [time, setTime] = useState<number>(60)
	const [questions, setQuestions] = useState<IQuestion[]>([
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
	const [correctAnswers, setCorrectAnswers] = useState<number>(0)
	/* Search */
	const [searchTerm, setSearchTerm] = useState<string>('')

	useEffect(() => {
		const fetchQuizzes = () => {
			return new Promise<IQuiz[]>(resolve => {
				setTimeout(() => {
					const savedQuizzesString = localStorage.getItem('quizzes')
					if (savedQuizzesString) {
						const savedQuizzes = JSON.parse(savedQuizzesString)
						resolve(savedQuizzes)
					} else {
						resolve([])
					}
				}, 2000)
			})
		}

		fetchQuizzes().then(data => {
			setQuizzes(data)
		})
	}, [])

	useEffect(() => {
		const quizzesJSON = JSON.stringify(quizzes)
		localStorage.setItem('quizzes', quizzesJSON)
	}, [quizzes])

	const saveQuiz = (newQuiz: IQuiz) => {
		const newQuizzes = [...quizzes, newQuiz]
		setQuizzes(newQuizzes)
	}

	const deleteQuiz = (quizId: string) => {
		const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId)
		setQuizzes(updatedQuizzes)
		localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes))
	}

	const updateQuiz = (updatedQuiz: IQuiz) => {
		const updatedQuizzes = quizzes.map(quiz =>
			quiz.id === updatedQuiz.id ? updatedQuiz : quiz
		)
		setQuizzes(updatedQuizzes)
		localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes))
	}

	return (
		<QuizCreatorContext.Provider
			value={{
				quizzes,
				setSelectedQuiz,
				selectedQuiz,
				saveQuiz,
				name,
				setName,
				time,
				setTime,
				questions,
				setQuestions,
				correctAnswers,
				setCorrectAnswers,
				deleteQuiz,
				updateQuiz,
				searchTerm,
				setSearchTerm
			}}
		>
			{children}
		</QuizCreatorContext.Provider>
	)
}
