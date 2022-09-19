import "../Button/button.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import axios from "../../Api/axios";
import AuthContext from "../../context/AuthProvider";

const SIGNUP_URL = "/auth/signup";

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Cet email n'est pas valide.").required("L'email est obligatoire."),
	password: Yup.string()
		.required("Le mot de passe est obligatoire.")
		.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre."),
	confirmPassword: Yup.string()
		.required("La confirmation du mot de passe est obligatoire.")
		.oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas."),
});

const CreateAccountForm = (props) => {
	useEffect(() => {
		document.getElementById("email").focus();
	}, []);

	const { setAuth } = useContext(AuthContext);
	const [success, setSuccess] = useState(false);

	const handleInput = async (data) => {
		try {
			const response = await axios.post(SIGNUP_URL, { email: data.email, password: data.password });
			console.log(JSON.stringify(response?.data));
			if (response?.data) {
				try {
					const response = await axios.post("/auth/login", { email: data.email, password: data.password });
					const { token, userId } = response?.data;
					console.log(JSON.stringify(response?.data));
					setAuth({ userId, token });
					setSuccess(true);
				} catch (error) {
					console.log(error);
					console.log(error.response?.data);
				}
			}
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
		<div className="p-4 w-1/3 border-2 border-primary border-b-8 border-r-8 rounded-2xl text-xl">
			{success ? (
				<div>
					<h1 className="text-lg font-bold text-center">Votre compte a bien été créé.</h1>
					<p className="text-lg text-center">Vous êtes désormais connecté et vous allez être redirigé vers la page d'accueil.</p>
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
						<p aria-live="assertive">{errors.email?.message}</p>
					</div>
					<div className="py-2">
						<label htmlFor="name">Votre mot de passe</label>
						<input className="pl-1 border-2 border-primary w-full" type="password" id="password" name="password" {...register("password")} />
						<p>{errors.password?.message}</p>
						<label htmlFor="name">Confirmez votre mot de passe</label>
						<input className="pl-1 border-2 border-primary w-full" type="password" id="password" name="confirmPassword" {...register("confirmPassword")} />
						<p aria-live="assertive">{errors.confirmPassword?.message}</p>
					</div>

					<div className="pt-4 pb-2 text-lg">
						<button type="submit" className="text-base brutal-btn">
							Créer un compte
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CreateAccountForm;
