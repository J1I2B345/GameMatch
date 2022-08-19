import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getUser } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";

const validate = yup.object({
	roles: yup.string(),
	ban: yup.string().required(),
});

export default function EditProfile() {
	const { _id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSelect);

	// const userActive = useSelector((state) => state.userProfile);

	useEffect(() => {
		dispatch(getUser(_id));
	}, []);

	const submit = (values) => {
		dispatch(editProfile(values));
		navigate("/profilehome");
	};
	console.log({ e: _id });
	console.log({ a: user });

	if (!user) return <h2>Cargando</h2>;

	return (
		<Container>
			<div className="portada">
				{
					<Formik
						initialValues={{
							roles: user[0].roles,
							ban: user[0].ban,
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<h1>Modificar perfil</h1>
								<h2>Perfil a modificar: {user[0].username} </h2>
								<img src={user[0].img} alt="" className="image-user" />
								<Form>
									<TextField
										className="input"
										label="Rol"
										name="rol"
										type="text"
										placeholder={user[0].roles}
									/>
									<TextField
										className="input"
										label="Status"
										name="ban"
										type="text"
										placeholder={user[0].ban}
									/>

									<button type="submit">Modificar</button>
								</Form>
							</div>
						)}
					</Formik>
				}
				<div>
					<button onClick={(e) => navigate("/panel")}>Ir a Panel</button>
					<button onClick={(e) => navigate("/profilehome")}>Ir a usuarios</button>
				</div>
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
	.image-user {
		margin-top: 2rem;
		margin-bottom: 2rem;
		height: 20rem;
		border-radius: 30px;
	}
	html,
	body {
		height: 100%;
		min-height: 100%;
		max-height: 100%;
	}
	.image {
		margin-top: 2rem;
		height: 3rem;
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
