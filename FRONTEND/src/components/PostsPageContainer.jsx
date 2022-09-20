// import { useState, useContext, useEffect } from "react";

import PostsPageHeader from "./PostsPageComponents/PostsPageHeader";
import PostsPageAddPost from "./PostsPageComponents/PostsPageAddPost";
// import PostsPagePostsView from "./PostsPageComponents/PostsPagePostsView.jsx";

const PostsPageContainer = () => {
	return (
		<div className=" container flex flex-col mx-auto px-[10%] content-center w-full">
			<PostsPageHeader />
			<PostsPageAddPost />
			{/* <PostsPagePostsView /> */}
		</div>
	);
};

export default PostsPageContainer;
