import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getUser, allUser } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
const validate = yup.object({
	roles: yup.string().required(),
	ban: yup.boolean().required(),
});

export default function EditNews() {
	const { t, i18n } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSelect);
	// const userActive = useSelector((state) => state.userProfile);

	// console.log(user);
	// console.log(user.ban);

	useEffect(() => {
		dispatch(allUser());
		dispatch(getUser(params._id));
	}, [dispatch]);

	//62f39a361fb29b83a353911f:user, 62f39a361fb29b83a3539121 adm

	const submit = async (values) => {
		let editUser = { ...values };
		let edit = await axios(`https://backend-gamematch.herokuapp.com/users/${values._id}`);

		//	editUser.roles = editUser.roles.push(editUser.roles);
		dispatch(editProfile(editUser));

		alert("User successfully edited: " + editUser.username + " 💖");
		console.log(editUser);
		navigate("/panel");
	};

	if (!user.roles) return <h2>Cargando</h2>;
	// {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

	return (
		<Container>
			<div className="portada">
				<Formik
					initialValues={{
						roles: `${user.roles[0]}`,
						ban: user.ban,
						_id: user._id,
						username: user.username,
						password: user.password,
						img: user.img,
					}}
					validationSchema={validate}
					onSubmit={submit}
				>
					{(formik) => (
						<div>
							<p></p>
							<div>
								<img
									className="image"
									src="https://imgs.search.brave.com/0SPdrau71xoJpN8vFNeVQnrpaljs27y2UmcfZb0GIRU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDAwLzM2/Ni85NTMvb3JpZ2lu/YWwvZWRpdC1wcm9m/aWxlLXZlY3Rvci1p/Y29uLmpwZw"
									alt=""
									key={user._id}
								/>
								<h1>
									<i style={{ fontFamily: "monospace", color: "	#E6E6FA" }}>✒️Edting...</i>
								</h1>
								<h2 style={{ fontFamily: "monospace", color: "		#F0E68C" }}>
									{user.username}
								</h2>{" "}
								<div></div>
							</div>
							<div style={{ marginLeft: "-300px", position: "fixed" }}>
								<button onClick={(e) => navigate("/panel")}>{t("Home")}</button>
								<button onClick={(e) => navigate("/profilehome")}> {"<- Back"}</button>
							</div>
							<Form>
								<h1>Username</h1>
								<TextField
									className="input"
									name="username"
									type="text"
									placeholder={user.username}
								/>
								<h1>Password</h1>
								<TextField
									className="input"
									name="password"
									type="text"
									placeholder={user.password}
								/>
								<h1>Rol</h1>
								<li style={{ color: "green" }}>Admin</li>
								<li style={{ color: "violet" }}>User</li>
								<TextField
									className="input"
									name="roles"
									type="text"
									placeholder={user.roles}
								/>
								<h1>Ban</h1>
								<li style={{ color: "red" }}>true </li>
								<li style={{ color: "green" }}>false </li>
								<TextField
									className="input"
									name="ban"
									type="text"
									placeholder={user.ban}
								/>
								<TextField className="input" name="img" placeholder={user.img} />

								<img src={user.img} alt="profile picture" className="image" />
								<button className="button" type="submit">
									{t("modify")}
								</button>
							</Form>
						</div>
					)}
				</Formik>
			</div>
		</Container>
	);
}
const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #5f0f99;
	color: #4b0082;
	.image-game {
		margin-top: 2rem;
		height: 12rem;
	}
	html,
	body {
		height: 100%;
		min-height: 100%;
		max-height: 100%;
	}
	.image {
		border-radius: 50%;
		margin-top: 2rem;
		height: 250px;
	}
	.login-link {
		color: #f0ebf2;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #e6e6fa;
		border-radius: 2rem;
		padding: 5rem;
		color: #800080;
		font-size: 1.5rem;
	}
	h1 {
		color: #4b0082;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: #4b0082;
		width: 50%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
	}
	button {
		background-color: #9a01e2;
		color: #f2f0f1;
		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		&:hover {
			background-color: #4e0eff;
		}
	}
	span {
		color: white;
		text-transform: uppercase;
		a {
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold;
		}
	}
`;
