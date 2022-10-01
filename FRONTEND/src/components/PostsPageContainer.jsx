import PostsPageHeader from "./PostsPageComponents/PostsPageHeader";
import PostsPageAddPost from "./PostsPageComponents/PostsPageAddPost";
import PostsPagePostsView from "./PostsPageComponents/PostsPagePostsView";

const PostsPageContainer = () => {
	return (
		<div className=" container flex flex-col mx-auto px-[10%] content-center w-full">
			<PostsPageHeader />
			<div className="overflow-y-scroll no-scrollbar">
				<PostsPageAddPost />
				<PostsPagePostsView />
			</div>
		</div>
	);
};

export default PostsPageContainer;
