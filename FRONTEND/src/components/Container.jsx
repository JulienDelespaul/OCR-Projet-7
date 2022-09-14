// Rename container to something more descriptive like LoginPage

import LoginPageSplashText from "./LoginPageComponents/LoginPageSplashText";
import LoginPageForm from "./LoginPageComponents/LoginPageForm";
import CreateAccountForm from "./LoginPageComponents/CreateAccountForm";
import { useState } from "react";

const Container = () => {
	// switch beetwen login and create account;
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="container flex justify-between  px-[10%] items-start w-full">
			<button onClick={() => setIsLogin(!isLogin)} className="text-base brutal-btn" />
			<LoginPageSplashText />
			{isLogin ? <LoginPageForm /> : <CreateAccountForm />}
			{/* <LoginPageForm />
			<CreateAccountForm /> */}
		</div>
	);
};

export default Container;
