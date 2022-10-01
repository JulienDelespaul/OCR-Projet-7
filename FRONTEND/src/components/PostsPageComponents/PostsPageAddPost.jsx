import "../Button/button.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../Api/axios";
import useAuth from "../../hooks/useAuth";
import usePostsRefresh from "../../hooks/usePostsRefresh";

const POST_URL = "/post";

const PostsPageAddPost = () => {
	const [image, setImage] = useState({ img: null, imgUrl: null });
	const { auth } = useAuth();
	const { refresh, setRefresh } = usePostsRefresh();

	const HandleInput = async (data) => {
		const formData = new FormData();
		formData.append("image", image.img);
		formData.append("content", data.content);
		try {
			const response = await axios.post(POST_URL, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${auth.token}`,
				},
			});
			console.log(response);
			// toggle refresh to trigger useEffect in Posts.jsx
			setRefresh(!refresh);
			reset();
			setImage({ img: null, imgUrl: null });
		} catch (error) {
			console.log(error);
		}
	};

	const HandleImageSelection = (e) => {
		e.preventDefault();
		// display image from input
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			let imgUrl = URL.createObjectURL(img);
			setImage({ img, imgUrl });
			console.log(image);
		}
		console.log(e.target.files[0]);
	};

	const { register, handleSubmit, reset } = useForm();

	return (
		<form
			onSubmit={handleSubmit(HandleInput)}
			className="h-min  w-full text-lg flex flex-col justify-between object-top border-2 border-tertiary border-b-8 border-r-8 rounded-2xl "
		>
			<label className="pl-4 pt-4 pb-1 font-bold text-primary">Exprimez-vous !</label>
			<textarea
				className="p-4 mx-4 h-32 flex text-wrap bg-secondary text-tertiary  border-1 border-black resize-none"
				placeholder="..."
				type="text"
				name="content"
				{...register("content")}
			/>
			<div>{image.img && <img src={image.imgUrl} alt="preview" className="h-80 mt-4 mx-auto rounded-2xl object-cover" />}</div>
			<div className="flex justify-end">
				<label className="brutal-btn m-4 cursor-pointer">
					{image?.img ? <span>Changer d'image</span> : <span>Ajouter une image</span>}
					<input type="file" className="hidden" name="image" {...register("image")} onChange={HandleImageSelection} />{" "}
				</label>
				<button className="brutal-btn m-4">Poster</button>
			</div>
		</form>
	);
};

export default PostsPageAddPost;
