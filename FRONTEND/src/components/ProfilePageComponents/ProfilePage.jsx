import "../Button/button.css";
import { useState, useEffect } from "react";
import axios from "../../Api/axios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
	const { auth } = useAuth();
	const [profile, setProfile] = useState({});
	const id = auth.userId;
	useEffect(() => {
		const getProfile = async () => {
			const response = await axios.get(`auth/profile/${id}`, { headers: { Authorization: `Bearer ${auth.token}` } });
			setProfile(response.data);
			console.log("profile", response.data);
		};
		getProfile();
	}, [auth.token]);

	const HandleInput = async (data) => {
		const formData = new FormData();
		formData.append("firstName", data.firstName);
		formData.append("lastName", data.lastName);
		formData.append("position", data.position);
		formData.append("department", data.department);
		formData.append("email", data.email);
		try {
			const response = await axios.put(`auth/profile/${id}`, formData, {
				headers: { Authorization: `Bearer ${auth.token}` },
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const { register, handleSubmit, reset } = useForm();

	return (
		<div className="h-min mt-4 p-4 w-full flex flex-col justify-between object-top border-2 border-tertiary border-b-8 border-r-8 rounded-2xl">
			<h1 className="text-black text-xl">Profil de l'utilisateur</h1>
			<form onSubmit={handleSubmit(HandleInput)} className="flex flex-col items-center">
				<div>
					<label htmlFor="firstName">Prénom</label>
					<input type="text" name="firstName" id="firstName" value={profile.firstName} {...register("firstName")} />
				</div>
				<div>
					<label htmlFor="lastName">Nom</label>
					<input type="text" name="lastName" id="lastName" value={profile.lastName} {...register("lastName")} />
				</div>
				<div>
					<label htmlFor="position">Poste</label>
					<input type="text" name="position" id="position" value={profile.position} {...register("position")} />
				</div>
				<div>
					<label htmlFor="department">Département</label>
					<input type="text" name="department" id="department" value={profile.department} {...register("department")} />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" value={profile.email} {...register("email")} />
				</div>
				<textarea name="Bio" id="Bio" cols="30" rows="10" placeholder="Bio" {...register("Bio")}></textarea>
			</form>
		</div>
	);
};

export default ProfilePage;
