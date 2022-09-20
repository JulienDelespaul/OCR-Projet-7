const PostsPageHeader = () => {
	return (
		<div className="h-20 w-full flex justify-between object-top border-2 border-primary border-b-8 border-r-8 rounded-2xl ">
			<h1 className="pl-4 flex items-baseline font-bold text-primary text-5xl ">Groupomania</h1>
			<ul className="flex flex-row font-bold text-2xl items-center pr-4">
				<li className="pr-4">Profil</li>
				<li>Deconnexion</li>
			</ul>
		</div>
	);
};

export default PostsPageHeader;
