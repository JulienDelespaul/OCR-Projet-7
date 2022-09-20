import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
	const auth = useAuth();
	const location = useLocation();
	console.log(allowedRoles);
	const role = auth.auth.role;

	return allowedRoles?.includes(role) ? (
		<Outlet />
	) : auth?.userId ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
