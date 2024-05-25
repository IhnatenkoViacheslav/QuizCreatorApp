import { IQuestion } from '../quiz-creator/quiz-build-question/question.interface'
import { IStatistic } from '../quiz-creator/quiz-build-question/statistic.interface'

export interface IQuiz {
	id: string
	name: string
	time: number
	statistics: IStatistic
	questions: IQuestion[]
}
