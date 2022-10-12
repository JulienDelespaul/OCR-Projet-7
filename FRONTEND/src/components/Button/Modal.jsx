import { useState } from "react";
import Edit from "./EditPost.jsx";
import PostsPageEditPost from "../PostsPageComponents/PostsPageEditPost.jsx";

const Modal = ({ post }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Edit setShowModal={setShowModal} />
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-7/12  my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-2 border-tertiary  border-b-8 border-r-8 rounded-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none px-4">
								{/*header*/}
								<div className="flex items-start justify-between py-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Modifier le post</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
									</button>
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Fermer
									</button>
								</div>
								{/*body*/}
								<PostsPageEditPost setShowModal={setShowModal} post={post} />
								{/*footer*/}
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default Modal;
