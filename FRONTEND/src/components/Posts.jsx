import { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../Api/axios";
import useAuth from "../hooks/useAuth";
import LikeButton from "./Button/LikeButton";
import Delete from "./Button/DeletePost";
import Modal from "./Button/Modal";
import ElapsedTime from "./Utilities/ElapsedTime";
import usePostsRefresh from "../hooks/usePostsRefresh";

const Posts = () => {
	const { refresh, setRefresh } = usePostsRefresh();
	const { auth } = useAuth();

	const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status, error, refetch } = useInfiniteQuery(
		[`/posts`],
		async ({ pageParam = 1 }) => {
			const response = await axios.get(`/post/page/${pageParam}`, { headers: { Authorization: `Bearer ${auth.token}` } });
			return response.data;
		},
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.length ? allPages.length + 1 : undefined;
			},
		}
	);

	if (refresh) {
		refetch();
		setRefresh(false);
	}

	const intObserver = useRef();
	const lastPostRef = useCallback(
		(post) => {
			if (isFetchingNextPage) return;

			if (intObserver.current) intObserver.current.disconnect();

			intObserver.current = new IntersectionObserver((posts) => {
				if (posts[0].isIntersecting && hasNextPage) {
					console.log("Dernier post");
					fetchNextPage();
				}
			});
			if (post) intObserver.current.observe(post);
		},
		[isFetchingNextPage, hasNextPage, fetchNextPage]
	);

	const content = data?.pages.map((pg) => {
		return pg.map((post, i) => {
			if (pg.length === i + 1) {
				return (
					<li
						ref={lastPostRef}
						className="h-min mt-4 p-4 w-full flex flex-col justify-between object-top border-2 border-tertiary border-b-8 border-r-8 rounded-2xl"
						key={post._id}
					>
						<div className="flex flex-row justify-between">
							<div>{post.userId}</div>
							<div className="text-base">Il y a {ElapsedTime(post?.createdAt)}</div>
						</div>
						<div className="bg-secondary mt-2 p-4 border-tertiary border-2">{post?.content}</div>
						<div>{post?.imageUrl && <img src={post.imageUrl} alt="post" className=" h-80 mt-4 mx-auto object-cover rounded-2xl" />}</div>
						<div className="flex justify-between mt-4">
							<div className="flex flex-row">
								<LikeButton post={post} />
								{post.likes !== 0 && <p className="pl-2 pt-2">{post.likes}</p>}
							</div>
							<div className="flex flex-row gap-x-4  ">
								<div className="flex flex-row ">{(post.userId === auth.userId || auth.role === "admin") && <Modal post={post} />}</div>
								<div className="flex flex-row ">{(post.userId === auth.userId || auth.role === "admin") && <Delete post={post} />}</div>
							</div>
						</div>
					</li>
				);
			}
			return (
				<li
					className="h-min mt-4 p-4 w-full flex flex-col justify-between object-top border-2 border-tertiary border-b-8 border-r-8 rounded-2xl"
					key={post._id}
				>
					<div className="flex flex-row justify-between">
						<div>{post.userId}</div>
						<div className="text-base">Il y a {ElapsedTime(post?.createdAt)}</div>
					</div>
					<div className="bg-secondary mt-2 p-4 border-tertiary border-2">{post?.content}</div>
					<div>{post?.imageUrl && <img src={post.imageUrl} alt="post" className=" h-80 mt-4 mx-auto object-cover rounded-2xl" />}</div>
					<div className="flex justify-between mt-4">
						<div className="flex flex-row">
							<LikeButton post={post} />
							{post.likes !== 0 && <p className="pl-2 pt-2">{post.likes}</p>}
						</div>
						<div className="flex flex-row gap-x-4  ">
							<div className="flex flex-row ">{(post.userId === auth.userId || auth.role === "admin") && <Modal post={post} />}</div>
							<div className="flex flex-row ">{(post.userId === auth.userId || auth.role === "admin") && <Delete post={post} />}</div>
						</div>
					</div>
				</li>
			);
		});
	});

	return (
		<article className="text-tertiary text-lg">
			<h2 className="h-min mt-4 p-4 w-full flex flex-col justify-between object-top border-2 text-primary font-bold text-3xl border-primary border-b-8 border-r-8 rounded-2xl">
				Contributions
			</h2>
			<ul className="flex flex-col gap-y-4">{content}</ul>
			{isFetchingNextPage && <p className="text-primary">Chargement...</p>}
		</article>
	);
};

export default Posts;
