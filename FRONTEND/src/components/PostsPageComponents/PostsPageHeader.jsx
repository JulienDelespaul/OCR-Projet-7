import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const PostsPageHeader = () => {
	const { handleLogout } = useLogout();

	return (
		<div className="sticky top-0 mb-4 w-full z-10 flex justify-between object-top border-2 bg-white text-tertiary border-primary border-b-8 border-r-8 rounded-2xl ">
			<h1 className="p-4 flex items-baseline font-bold text-primary text-5xl ">Groupomania</h1>
			<ul className="flex flex-row font-bold text-2xl items-center pr-4">
				<li className="pr-4 hover:text-primary">
					<Link to="/profile"> Profil</Link>
				</li>
				<li>
					<button onClick={handleLogout} className="hover:text-primary">
						Déconnexion
					</button>
				</li>
			</ul>
		</div>
	);
};

export default PostsPageHeader;
