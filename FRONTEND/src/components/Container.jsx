// Rename container to something more descriptive like LoginPage

import LoginPageSplashText from "./LoginPageComponents/LoginPageSplashText";
import LoginPageForm from "./LoginPageComponents/LoginPageForm";
import CreateAccountForm from "./LoginPageComponents/CreateAccountForm";
import { useState } from "react";

const Container = () => {
	// switch beetwen login and create account;
	const [createAccountForm, setCreateAccountForm] = useState(false);
	const toggleAccountForm = () => {
		setCreateAccountForm(!createAccountForm);
	};

	return (
		<div className="container flex justify-between  px-[10%] items-start w-full">
			<LoginPageSplashText />
			{!createAccountForm ? <LoginPageForm toggleAccountForm={toggleAccountForm} /> : <CreateAccountForm />}
		</div>
	);
};

export default Container;
