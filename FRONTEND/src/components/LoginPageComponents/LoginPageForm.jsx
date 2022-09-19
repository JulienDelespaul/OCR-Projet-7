import "../Button/button.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../Api/axios";

const LOGIN_URL = "/auth/login";

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Cet email n'est pas valide.").required("L'email est obligatoire."),
	password: Yup.string().required("Le mot de passe est obligatoire."),
});

const LoginPageForm = (props) => {
	useEffect(() => {
		document.getElementById("email").focus();
	}, []);

	const { setAuth } = useContext(AuthContext);
	const [success, setSuccess] = useState(false);

	const handleInput = async (data) => {
		try {
			const response = await axios.post(LOGIN_URL, { email: data.email, password: data.password });
			console.log(JSON.stringify(response?.data));
			const { token, userId } = response?.data;
			// const roles = response?.data?.roles;
			setAuth({ userId, token });
			setSuccess(true);
		} catch (error) {
			console.log(error);
			console.log(error.response?.data);
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema), mode: "onTouched" });

	return (
		<div className="p-4 w-1/3 border-2 border-black border-b-8 border-r-8 rounded-2xl text-xl">
			{success ? (
				<div>
					<h1 className="text-primary text-lg font-bold text-center">Vous êtes désormais connecté.</h1>
					<p className="text-primary text-lg text-center"> Vous allez être redirigé vers la page d'accueil.</p>
				</div>
			) : (
				<form onSubmit={handleSubmit(handleInput)}>
					<div className="py-2">
						<label htmlFor="email">Votre adresse E-mail</label>
						<input
							onBlur={handleSubmit(handleInput)}
							className="pl-1 border-2 border-primary w-full"
							type="email"
							name="email"
							id="email"
							{...register("email")}
						/>
						<p>{errors.email?.message}</p>
					</div>
					<div className="py-2">
						<label htmlFor="name">Votre mot de passe</label>
						<input className="pl-1 border-2 border-primary w-full" type="password" id="password" name="password" {...register("password")} />
						<p>{errors.password?.message}</p>
					</div>

					<div className="py-2">
						<button className="text-base brutal-btn ">Vous connecter</button>
					</div>
					<div className="pt-4 pb-2 text-lg">
						<p>Vous n'avez pas de compte ?</p>
						<button className="text-base brutal-btn" onClick={props.toggleAccountForm}>
							Créer un compte
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default LoginPageForm;
