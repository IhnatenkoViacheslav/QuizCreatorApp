import { FC, useContext } from 'react'
import { MdControlPoint, MdHelp, MdSearch } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { QuizCreatorContext } from '../../../context/QuizCreatorContext'
import Button from '../button/Button'

const Header: FC = () => {
	const { searchTerm, setSearchTerm } = useContext(QuizCreatorContext)
	return (
		<header className="flex items-center justify-between p-6 text-tiny border-b-2 border-primary">
			<Link
				className="gradient flex items-center gap-4 text-white rounded-2xl"
				to="/"
			>
				<MdHelp color="#9733ee" size={50} />
				<p className="font-semibold text-lg">Quizzlenge</p>
			</Link>
			<div className="mb-4 relative">
				<MdSearch className="absolute top-2 left-2" size={30} color="#9733ee" />
				<input
					className="border-b-2 border-l-2 rounded-xl border-primary pl-10 p-2 outline-none"
					type="text"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder="Search by quiz name..."
				/>
			</div>
			<Link to="/creator">
				<Button>
					<MdControlPoint size={25} color="white" />
					Create new Quiz
				</Button>
			</Link>
		</header>
	)
}

export default Header
