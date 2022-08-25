import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editGame } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const validate = yup.object({
	name: yup.string().required().min(3),
	gender: yup.string().required().min(3),
	elo: yup.string().required().min(3),
	position: yup.string().required().min(3),
	image: yup.string().required().url(),
	id: yup.string().required(),
});

export default function EditGame() {
	const { t, i18n } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const game = useSelector((state) => state.gameSelect);
	const [game, setGame] = useState("");
	const userActive = useSelector((state) => state.userProfile);

	async function getGame(id) {
		let selectedGame = await axios(`https://backend-gamematch.herokuapp.com/Games/${id}`);
		setGame(selectedGame.data);
	}
	useEffect(() => {
		getGame(params.id);
	}, []);

	const submit = (values) => {
		let editedGame = { ...values };
		editedGame.elo = editedGame.elo.split(",").map((e) => e.trim());
		editedGame.position = editedGame.position.split(",").map((e) => e.trim());
		dispatch(editGame(editedGame));
		navigate("/gamehome");
	};

	if (!game) return <h2>Cargando</h2>;
	// {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

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
						<i style={{ fontFamily: "monospace", color: "	#E6E6FA" }}>✒️{t("editing_game")}</i>
					</h1>
					<h1 style={{ fontFamily: "monospace", color: "		#F0E68C" }}>{game.name}</h1>
					<div></div>

					<img src={game.image} alt="" className="image" />
				</div>
				<div style={{ marginLeft: "-300px", position: "fixed" }}>
					<button onClick={(e) => navigate("/panel")}>{t("Home")}</button>
					<button onClick={(e) => navigate("/gamehome")}> {t("back")}</button>
				</div>

				{
					<Formik
						initialValues={{
							name: game.name,
							image: game.image,
							elo: game.elo,
							position: game.position,
							gender: game.gender,
							id: game._id,
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<Form>
									<TextField
										className="input"
										label={t("game_name")}
										name="name"
										type="text"
										placeholder={game.name}
									/>
									<TextField
										className="input"
										label={t("kind_of_game")}
										name="gender"
										type="text"
										placeholder={game.gender}
									/>
									<TextField
										className="input"
										label={t("levels")}
										name="elo"
										type="text"
										placeholder={game.elo}
									/>
									<TextField
										className="input"
										label={t("positions")}
										name="position"
										type="text"
										placeholder={game.position}
									/>
									<TextField
										className="input"
										label={t("image")}
										name="image"
										type="text"
										placeholder={game.image}
									/>
									<TextField
										className="input"
										label="id"
										name="id"
										type="text"
										placeholder={game._id}
									/>

									<button className="btn btn-dark mt-3" type="submit">
										{t("modify")}
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
		border-radius: 10%;
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
