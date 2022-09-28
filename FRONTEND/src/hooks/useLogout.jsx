import useAuth from "./useAuth";

const useLogout = () => {
	const { setAuth } = useAuth();

	const handleLogout = () => {
		setAuth({});
	};

	return { handleLogout };
};

export default useLogout;
