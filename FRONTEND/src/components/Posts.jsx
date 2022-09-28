import { useState, useEffect } from "react";
import axios from "../Api/axios";
import useAuth from "../hooks/useAuth";

const Posts = () => {
	const [posts, setPosts] = useState();
	console.log("bug ici");
	const { auth } = useAuth();
	useEffect(() => {
		let isMounted = true;
		// const controller = new AbortController();

		const getPosts = async () => {
			try {
				const response = await axios.get(
					"/post",
					// pass token in header
					{ headers: { Authorization: `Bearer ${auth.token}` } }

					//, { signal: controller.signal}
				);
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
			// controller.abort();
		};
	}, []);

	return (
		<article>
			<h2>Posts List</h2>
			{posts?.length ? (
				<ul>
					{posts.map((post, i) => (
						<li className="h-min w-full flex flex-col justify-between object-top border-2 border-primary border-b-8 border-r-8 rounded-2xl " key={i}>
							{post?.createdAt}
							{post?.content}
							<img src={post?.imageUrl} alt={post?.name} className="h-96 w-full object-cover" />
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
