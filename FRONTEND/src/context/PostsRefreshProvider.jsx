import { createContext, useState } from "react";

const PostsRefreshContext = createContext({});

export const PostsRefreshProvider = ({ children }) => {
	const [refresh, setRefresh] = useState(false);

	return <PostsRefreshContext.Provider value={{ refresh, setRefresh }}>{children}</PostsRefreshContext.Provider>;
};

export default PostsRefreshContext;
