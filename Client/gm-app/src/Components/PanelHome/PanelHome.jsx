import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import GameMatch from "../../assets/GameMatch.png";
import iconApp from "../../assets/iconApp.png";
import { useSelector } from "react-redux";

export default function PanelHome() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.userProfile);

	if (!user) return <div>Loading...</div>;
	return (
		<Container>
			{!user.roles[0].name === "Admin" || !user.roles[0].name === "SuperAdmin" ? (
				<div>Debes ser al menos admin</div>
			) : (
				<div className="portada">
					<div className="portada_text">
						<img src={GameMatch} className="image-game" alt="" />
					</div>
					<div className="portada_img">
						<img src={iconApp} className="image-icon" alt="" />
					</div>
					<button className="modify-btn" onClick={(e) => navigate(`/News`)}>
						Noticias
					</button>
					<button className="modify-btn" onClick={(e) => navigate(`/gamehome`)}>
						Juegos
					</button>
					<button className="modify-btn" onClick={(e) => navigate(`/profilehome`)}>
						Usuarios
					</button>
				</div>
			)}
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
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
		height: 100vh;
		min-height: 100%;
		max-height: 100%;
	}
	.image-icon {
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
	.modify-btn {
		text-align: center;
		text-transform: uppercase;
		display: inline-block;
		margin: 10px;
		font-weight: bold;
		padding: 15px 25px 15px 25px;
		background-color: lightgray;
		text-shadow: -1px -1px black, 1px 1px white;
		color: #9a01e2;
		-webkit-border-radius: 7px;
		-moz-border-radius: 7px;
		-o-border-radius: 7px;
		border-radius: 7px;
		box-shadow: 0 0.2em gray;
		cursor: pointer;
		&:hover {
			color: #4e0eff;
		}
		.start-btn:active {
			box-shadow: none;
			position: relative;
			top: 0.5em;
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
