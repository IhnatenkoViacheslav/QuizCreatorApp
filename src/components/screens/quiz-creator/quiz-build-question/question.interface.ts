import { IAnswer } from '../../../ui/quiz-item/answer.interface'

export interface IQuestion {
	id: string
	mainQuestion: string
	answers: IAnswer[]
	points: number
}
