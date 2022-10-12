import "../Button/button.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../Api/axios";
import useAuth from "../../hooks/useAuth";
import usePostsRefresh from "../../hooks/usePostsRefresh";

const PostsPageEditPost = ({ post, setShowModal }) => {
	const [image, setImage] = useState({ img: null, imgUrl: null });
	const [freshPost, setFreshPost] = useState(post);
	const { auth } = useAuth();
	const { setPostId, setRefresh } = usePostsRefresh();
	const id = post._id;

	useEffect(() => {
		let isMounted = true;

		const getPost = async () => {
			try {
				const response = await axios.get(`/post/${id}`, {
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				});
				const freshPostData = response.data;
				isMounted && setFreshPost(freshPostData);
				console.log("fresh post data", freshPostData);
			} catch (error) {
				console.log(error);
			}
		};
		getPost();

		return () => {
			isMounted = false;
		};
	}, [id, auth.token]);

	const HandleInput = async (data) => {
		const formData = new FormData();
		formData.append("content", data.content);
		formData.append("image", image.img);
		try {
			const response = await axios.put(`/post/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${auth.token}`,
				},
			});
			console.log(response);
			// toggle refresh to trigger useEffect in Posts.jsx
			setRefresh(true);
			setPostId(id);
			reset();
			setImage({ img: null, imgUrl: null });
			setShowModal(false);
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
			console.log("image state updated", image);
		}
		console.log(e.target.files[0]);
	};

	const { register, handleSubmit, reset } = useForm();

	return (
		<form onSubmit={handleSubmit(HandleInput)} className="h-min  w-full text-lg flex flex-col justify-between object-top ">
			<textarea
				className="p-4 h-32 flex text-wrap bg-secondary text-tertiary  border-1 border-black resize-none"
				placeholder="..."
				type="text"
				name="content"
				// value={post.content}
				{...register("content")}
			>
				{freshPost.content}
			</textarea>
			<div>{image.img && <img src={image.imgUrl} alt="preview" className="h-80 mt-4 mx-auto rounded-2xl object-cover" />}</div>
			<div>{freshPost.imageUrl && !image.img && <img src={freshPost.imageUrl} alt="preview" className="h-80 mt-4 mx-auto rounded-2xl object-cover" />}</div>
			<div className="flex justify-end">
				<label className="brutal-btn m-4 cursor-pointer">
					{freshPost.imageUrl || image.imgUrl !== null ? <span>Changer d'image</span> : <span>Ajouter une image</span>}
					<input type="file" className="hidden" name="image" {...register("image")} onChange={HandleImageSelection} />{" "}
				</label>
				<button className="brutal-btn m-4">Poster</button>
			</div>
		</form>
	);
};

export default PostsPageEditPost;
