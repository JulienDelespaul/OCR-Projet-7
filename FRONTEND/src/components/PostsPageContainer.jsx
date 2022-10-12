import PostsPageHeader from "./PostsPageComponents/PostsPageHeader";
import PostsPageAddPost from "./PostsPageComponents/PostsPageAddPost";
import PostsPagePostsView from "./PostsPageComponents/PostsPagePostsView";

const PostsPageContainer = () => {
	return (
		<div className=" container flex flex-col mx-auto  content-center w-full">
			<PostsPageHeader />
			<div className="overflow-y-scroll">
				<PostsPageAddPost />
				<PostsPagePostsView />
			</div>
		</div>
	);
};

export default PostsPageContainer;
