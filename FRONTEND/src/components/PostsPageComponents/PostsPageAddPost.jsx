import "../Button/button.css";

const PostsPageHeader = () => {
	return (
		<form className="h-min w-full flex flex-col justify-between object-top border-2 border-primary border-b-8 border-r-8 rounded-2xl ">
			<label className="px-4 mt-4">Exprimez-vous !</label>
			<textarea className="px-4 mx-4 h-20 flex text-wrap text-2xl font-bold bg-slate-300 text-primary  border-1 border-black " placeholder="..." />
			<div className="flex justify-between">
				<div className="px-4 my-4">like</div>
				<div>
					<button className="brutal-btn m-4">Ajouter une image</button>
					<button className="brutal-btn m-4">Poster</button>
				</div>
			</div>
		</form>
	);
};

export default PostsPageHeader;
