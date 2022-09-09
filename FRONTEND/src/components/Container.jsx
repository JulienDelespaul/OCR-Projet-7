import LoginPageSplashText from "./LoginPageComponents/LoginPageSplashText";
import LoginPageForm from "./LoginPageComponents/LoginPageForm";

const Container = () => {
	return (
		<div className="container flex justify-between  px-[10%] items-start w-full">
			<LoginPageSplashText />
			<LoginPageForm />
		</div>
	);
};

export default Container;
