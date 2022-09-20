import { useNavigate } from "react-router-dom";
import LoginPageSplashText from "../components/LoginPageComponents/LoginPageSplashText";

const UnauthorizedPage = () => {
	const navigate = useNavigate();
	const timedRedirect = () => {
		setTimeout(() => {
			navigate("/login");
		}, 5000);
	};
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="container flex justify-between  px-[10%] items-start w-full">
				<LoginPageSplashText />
				<div className="mt-4 p-4 w-1/3 border-2 border-black border-b-8 border-r-8 rounded-2xl text-xl">
					<h1 className="text-primary text-lg font-bold text-center">Désolé !</h1>
					<p className=" text-lg text-left">Vous n'avez pas l'autorisation nécessaire pour accéder à ce contenu.</p>
					<p className="text-lg text-left">Vous allez être redirigé vers la page de connexion.</p>
					{timedRedirect()}
				</div>
			</div>
		</div>
	);
};

export default UnauthorizedPage;
