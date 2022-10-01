import PostsPageContainer from "../components/PostsPageContainer";
import { PostsRefreshProvider } from "../context/PostsRefreshProvider";

const PostsPage = () => {
	return (
		<PostsRefreshProvider>
			<div className="h-screen flex  justify-center">
				<PostsPageContainer />
			</div>
		</PostsRefreshProvider>
	);
};

export default PostsPage;
