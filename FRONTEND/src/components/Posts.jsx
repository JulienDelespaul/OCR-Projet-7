import { useState, useEffect } from "react";
import axios from "../Api/axios";
import useAuth from "../hooks/useAuth";
import usePostsRefresh from "../hooks/usePostsRefresh";
import LikeButton from "./Button/LikeButton";
// import Edit from "./Button/EditPost;
import Delete from "./Button/DeletePost";

const Posts = () => {
	const { refresh } = usePostsRefresh();
	const [posts, setPosts] = useState();
	const { auth } = useAuth();
	useEffect(() => {
		let isMounted = true;

		const getPosts = async () => {
			try {
				const response = await axios.get("/post", { headers: { Authorization: `Bearer ${auth.token}` } });
				console.log(response.data);
				const sortedPosts = response.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				isMounted && setPosts(sortedPosts);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();

		return () => {
			isMounted = false;
		};
	}, [refresh, auth.token]);

	const elapsedTime = (date) => {
		const now = new Date();
		const postDate = new Date(date);
		const diff = now - postDate;
		const diffInMinutes = Math.floor(diff / 1000 / 60);
		const diffInHours = Math.floor(diffInMinutes / 60);
		const diffInDays = Math.floor(diffInHours / 24);
		const diffInMonths = Math.floor(diffInDays / 30);
		const diffInYears = Math.floor(diffInMonths / 12);
		if (diffInMinutes < 2) {
			return `${diffInMinutes} minute`;
		} else if (diffInMinutes < 60) {
			return `${diffInMinutes} minutes`;
		} else if (diffInHours === 1) {
			return `${diffInHours} heure`;
		} else if (diffInHours < 24) {
			return `${diffInHours} heures`;
		} else if (diffInDays === 1) {
			return `${diffInDays} jour`;
		} else if (diffInDays < 30) {
			return `${diffInDays} jours`;
		} else if (diffInMonths < 12) {
			return `${diffInMonths} mois`;
		} else if (diffInYears === 1) {
			return `${diffInYears} an`;
		} else {
			return `${diffInYears} ans`;
		}
	};

	return (
		<article className="text-tertiary text-lg">
			<h2 className="h-min mt-4 p-4 w-full flex flex-col justify-between object-top border-2 text-primary font-bold text-3xl border-primary border-b-8 border-r-8 rounded-2xl">
				Contributions
			</h2>
			{posts?.length ? (
				<ul>
					{posts.map((post, i) => (
						<li className="h-min mt-4 p-4 w-full flex flex-col justify-between object-top border-2 border-tertiary border-b-8 border-r-8 rounded-2xl" key={i}>
							<div className="flex flex-row justify-between">
								<div>Pseudo box placeholder</div>
								<div className="text-base">Il y a {elapsedTime(post?.createdAt)}</div>
							</div>
							<div className="bg-secondary mt-2 p-4 border-tertiary border-2">{post?.content}</div>
							<div>{post?.imageUrl && <img src={post.imageUrl} alt="post" className=" h-80 mt-4 mx-auto object-cover rounded-2xl" />}</div>
							<div className="flex justify-between mt-4">
								<div className="flex flex-row">
									<LikeButton post={post} />
									{post.likes !== 0 && <p className="pl-2 pt-2">{post.likes}</p>}
								</div>
								<div className="flex flex-row ">{(post.userId === auth.userId || auth.role === "admin") && <Delete post={post} />}</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>No posts to display</p>
			)}
		</article>
	);
};

export default Posts;
