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
	}, [gamesDB]);
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
				<div className="card-container">
					<div className="card" key={data.name}>
						<div>
							<img className="image-game" src={data.image} alt="" key={data._id} />
							<h1 style={{ fontFamily: "consolas", color: "		#E6E6FA" }}>{data.name}</h1>
						</div>
						<button onClick={(e) => deleteButton(data._id)}>{t("delete")}</button>
						<button onClick={(e) => navigate(`games/${data._id}`)}>{t("modify")}</button>
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
	display: grid;
	flex-direction: row;
	grid-template-columns: repeat(3, minmax(200px, 1fr));
	align-items: stretch;
	gap: 3em;
	align-items: center;
	background-color: #5f0f99;

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
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
		width: 100%;
		margin-bottom: 1em;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.2em;
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
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
		flex-wrap: wrap;
	}
	.card {
		width: 25em;
		height: auto;
		position: relative;
		background: transparent;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		padding: 20px;
		transition: all 0.3s ease-in;
	}
	.card > * {
		padding: 10px;
	}
	.card .image-game {
		height: 100%;
		width: 25em;
		background-position: center center;
		background-size: cover;
		border-radius: 30px;
	}

	.card:hover {
		color: #fff;
		box-shadow: 0px 0px 11px 5px #000000;
	}
`;
