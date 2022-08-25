import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validate = yup.object({
	name: yup.string().required().min(3),
	gender: yup.string().required().min(3),
	elo: yup.string().required().min(3),
	position: yup.string().required().min(3),
	image: yup.string().required().url(),
});

export default function CreateGame() {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const profile = useSelector((state) => state.userProfile);
	const submit = (values, actions) => {
		let editedGame = { ...values };
		editedGame.elo = editedGame.elo.split(",").map((e) => e.trim());
		editedGame.position = editedGame.position.split(",").map((e) => e.trim());
		fetch(`https://backend-gamematch.herokuapp.com/games/`, {
			method: "POST",
			headers: { Accept: "applcation/json", "Content-Type": "application/json" },
			body: JSON.stringify(editedGame),
		})
			.then((response) => {
				return response.json();
			})
			.then(() => {
				createGame(editedGame);
			});

		actions.resetForm();
	};
	return (
		<Container>
			<div className="portada">
				<div>
					<img
						className="image"
						src="https://cdn-icons-png.flaticon.com/512/262/262545.png"
						alt=""
					/>
					<h1>
						<i style={{ fontFamily: "monospace", color: "	#E6E6FA" }}>✒️{t("create_game")}</i>
					</h1>
					<div></div>
				</div>
				<div style={{ marginLeft: "-300px", position: "fixed" }}>
					<button onClick={(e) => navigate("/panel")}>{t("Home")}</button>
					<button onClick={(e) => navigate("/gamehome")}> {t("back")}</button>
				</div>
				{
					<Formik
						initialValues={{
							name: "",
							gender: "",
							elo: "",
							position: "",
							image: "",
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<Form>
									<TextField
										className="input"
										label={t("Name")}
										name="name"
										type="text"
										placeholder="Nombre del juego"
									/>
									<TextField
										className="input"
										label={t("kind_of_game")}
										name="gender"
										type="text"
										placeholder="Genero del juego"
									/>
									<TextField
										className="input"
										label={t("levels")}
										name="elo"
										type="text"
										placeholder="Niveles de jugadores"
									/>
									<TextField
										className="input"
										label={t("positions")}
										name="position"
										type="text"
										placeholder="Posiciones de jugadores"
									/>
									<TextField
										className="input"
										label={t("image")}
										name="image"
										type="text"
										placeholder="Imagen en url"
									/>
									<button className="btn btn-dark mt-3" type="submit">
										{t("create_game_btn")}
									</button>
								</Form>
							</div>
						)}
					</Formik>
				}
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
