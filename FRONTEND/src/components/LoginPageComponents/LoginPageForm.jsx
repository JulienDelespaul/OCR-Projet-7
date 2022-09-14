import "../Button/button.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useHttp from "../../hooks/use-httpRequest";

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Cet email n'est pas valide.").required("L'email est obligatoire."),
	password: Yup.string()
		.required("Le mot de passe est obligatoire.")
		.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre."),
});

const LoginPageForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({ resolver: yupResolver(validationSchema), mode: "onTouched" });
	const { isLoading, error, sendRequest } = useHttp();
	const doStuffWithData = () => {
		// Here handle userid and token storage, most likely in local storage. Checkk XSS risk in react.
		console.log(res.body);
	};
	const handleInput = (data) => {
		// - Login, POST, /api/auth/signup, {email: string, password: string}
		sendRequest(
			{
				url: "http://localhost:3001/api/auth/login",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: { email: data.email, password: data.password },
			},
			doStuffWithData(response.body)
		);
	};

	return (
		<div className="p-4 w-1/3 border-2 border-black border-b-8 border-r-8 rounded-2xl text-xl">
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
					<button
						disabled={!isDirty || !isValid}
						className="text-base brutal-btn disabled:text-secondary disabled:border-secondary disabled:after:bg-secondary"
					>
						Vous connecter
					</button>
				</div>
				<div className="pt-4 pb-2 text-lg">
					<p>Vous n'avez pas de compte ?</p>
					<button type="submit" className="text-base brutal-btn">
						Créer un compte
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginPageForm;
