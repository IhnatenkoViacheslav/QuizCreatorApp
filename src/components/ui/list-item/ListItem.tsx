import { FC, useContext } from 'react'
import { MdDelete, MdEdit, MdQuiz } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import { IQuiz } from '../../screens/quiz/quiz.interface'

interface IListItem {
	quiz: IQuiz
}

const ListItem: FC<IListItem> = ({ quiz }) => {
	const { setSelectedQuiz, deleteQuiz } = useContext(QuizCreatorContext)
	return (
		<div className="rounded-xl flex flex-col px-6 py-4 mb-2 gap-2 items-center justify-between border-[0.5px] border-primary text-tiny  shadow">
			<Link to={`/quiz/${quiz.id}`} onClick={() => setSelectedQuiz(quiz)}>
				<MdQuiz color="#9733ee" size={150} />
				<div className="">
					<p className="font-bold">{quiz.name}</p>
					<p>{quiz.questions.length} questions</p>
					<p>Time: {quiz.time} minutes</p>
				</div>
			</Link>
			<div className="flex gap-4">
				<Link
					to={`/edit-quiz/${quiz.id}`}
					onClick={() => setSelectedQuiz(quiz)}
				>
					<MdEdit
						className="text-primary hover:text-[#411f5e] transition-all cursor-pointer"
						size={30}
					/>
				</Link>
				<MdDelete
					className="text-[#d020a6] hover:text-[#5a1e4c] cursor-pointer transition-all"
					size={30}
					onClick={() => deleteQuiz(quiz.id)}
				/>
			</div>
		</div>
	)
}

export default ListItem
