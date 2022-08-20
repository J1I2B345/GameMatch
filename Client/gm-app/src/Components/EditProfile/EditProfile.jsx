import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getUser } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const validate = yup.object({
	roles: yup.string().required(),
	ban: yup.boolean().required(),
});

export default function EditNews() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSelect);
	// const userActive = useSelector((state) => state.userProfile);

	console.log(user);
	// console.log(user.ban);

	useEffect(() => {
		dispatch(getUser(params._id));
	}, [dispatch]);

	//62f39a361fb29b83a353911f:user, 62f39a361fb29b83a3539121 adm

	const submit = (values) => {
		let editUser = { ...values };
		editUser.roles = editUser.roles.push(editUser.roles);
		dispatch(editProfile(editUser));
		// navigate("/profilehome");
	};

	if (!user.roles) return <h2>Cargando</h2>;
	// {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

	return (
		<Container>
			<div className="portada">
				{
					<Formik
						initialValues={{
							roles: `${user.roles[0]}`,
							ban: user.ban,
							_id: user._id,
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<h1>Modificar Usuario</h1>

								<h2>Usuario a modificar: {user.username}</h2>
								<img className="image" src={user.img} alt="" key={user._id} />

								<Form>
									<TextField
										className="input"
										label="Rol"
										name="roles"
										type="text"
										placeholder={user.roles[0]}
									/>

									<TextField
										className="input"
										label="Ban"
										name="ban"
										type="boolean"
										placeholder={user.ban}
									/>
									<TextField
										className="input"
										label="id"
										name="_id"
										type="text"
										placeholder={user._id}
									/>

									<button className="button" type="submit">
										Modificar
									</button>
								</Form>
							</div>
						)}
					</Formik>
				}
				<button onClick={(e) => navigate("/panel")}>Ir a Panel</button>
				<button onClick={(e) => navigate("/profilehome")}>Ir a usuarios</button>
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
		margin-top: 2rem;
		height: 15rem;
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
		background-color: #00000076;
		border-radius: 2rem;
		padding: 5rem;
	}
	h1 {
		color: #f0ebf2;
		text-transform: uppercase;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: white;
		width: 100%;
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
