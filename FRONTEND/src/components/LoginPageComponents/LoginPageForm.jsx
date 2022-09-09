import "../Button/button.css";

const LoginPageForm = () => {
	return (
		<div className="p-4 w-1/3 border-2 border-black border-b-8 border-r-8 rounded-2xl text-xl">
			<form>
				<div className="py-2">
					<label htmlFor="email">Votre adresse E-mail</label>
					<input className="border-2 border-primary w-full" type="email" id="email" />
				</div>
				<div className="py-2">
					<label htmlFor="name">Votre mot de passe</label>
					<input className="border-2 border-primary w-full" type="text" id="password" />
				</div>

				<div className="py-2">
					<button className="text-base brutal-btn">Vous connecter</button>
				</div>
				<div className="pt-4 pb-2 text-lg">
					<p>Vous n'avez pas de compte ?</p>
					<button className="text-base brutal-btn">Créer un compte</button>
				</div>
			</form>
		</div>
	);
};

export default LoginPageForm;
