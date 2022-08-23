import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import axios from "axios";

const GameCard = () => {
	const { t, i18n } = useTranslation();
	let [gamesDB, setGames] = useState([]);
	const navigate = useNavigate();

	const fetchGames = async () => {
		try {
			const response = await axios.get("https://backend-gamematch.herokuapp.com/games");
			const respuesta = response.data;
			setGames(respuesta);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		fetchGames();
	}, []);
	const profile = useSelector((state) => state.userProfile);
	const deleteButton = async (id) => {
		try {
			// console.log({ game });

			fetch(`https://backend-gamematch.herokuapp.com/games/${id}`, {
				method: "DELETE",
				headers: { Accept: "applcation/json", "Content-Type": "application/json" },
				body: JSON.stringify(profile),
			})
				.then((response) => {
					return response.json();
				})
				.then(() => {
					fetchGames();
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Container>
			{gamesDB.map((data) => (
				<div key={data.name}>
					<div>
						<h2>{data.name}</h2>
						<button onClick={(e) => navigate(`games/${data._id}`)}>{t("Edit")}</button>
						<button onClick={(e) => deleteButton(data._id)}>{t("delete")}</button>
						<br />
						<img className="image-game" src={data.image} alt="" key={data._id} />
					</div>
				</div>
			))}
		</Container>
	);
};

export default GameCard;

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
