import "../Button/button.css";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "../../Api/axios";
import useAuth from "../../hooks/useAuth";

const POST_URL = "/post";

const PostsPageAddPost = () => {
	const { auth } = useAuth();
	const ref = useRef();
	const handleClick = (e) => {
		ref.current.click();
	};

	const HandleInput = async (data) => {
		console.log(data.image[0].name);
		const formData = new FormData();
		formData.append("image", data.image[0]);
		formData.append("content", data.content);
		// formData.append("userId", auth.userId);
		try {
			const response = await axios.post(POST_URL, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${auth.token}`,
				},
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	const { register, handleSubmit } = useForm();

	return (
		<form
			onSubmit={handleSubmit(HandleInput)}
			className="h-min mt-2 w-full text-lg flex flex-col justify-between object-top border-2 border-primary border-b-8 border-r-8 rounded-2xl "
		>
			<label className="pl-4 pt-4 pb-1 font-bold text-primary">Exprimez-vous !</label>
			<textarea
				className="px-4 mx-4 h-32 flex text-wrap bg-secondary text-tertiary  border-1 border-black resize-none"
				placeholder="..."
				type="text"
				name="content"
				{...register("content")}
			/>
			<div className="flex justify-end">
				<div>
					<div>
						<input style={{ display: "none" }} ref={ref} type="file" name="image" {...register("image")} />
						<button onClick={handleClick} className="brutal-btn m-4">
							Ajouter une image
						</button>
					</div>
					<button className="brutal-btn m-4">Poster</button>
				</div>
			</div>
		</form>
	);
};

export default PostsPageAddPost;
