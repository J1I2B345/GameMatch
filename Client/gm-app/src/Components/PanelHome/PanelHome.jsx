import styled from "styled-components";
import React, { Profiler, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameMatch from "../../assets/GameMatch.png";
import iconApp from "../../assets/iconApp.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import enflag from "../../assets/englishflag.png";
import esflag from "../../assets/spanishflag.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editProfile, getUser, allUser } from "../../redux/actions";

export default function PanelHome() {
	const { t, i18n } = useTranslation();
	const [language, setLenguage] = useState("es");
	const dispatch = useDispatch();
	const onChangeLanguaje = () => {
		i18n.changeLanguage(language);
		if (language === "es") {
			setLenguage("en");
		} else {
			setLenguage("es");
		}
	};
	useEffect(() => {
		dispatch(allUser());
	}, [dispatch]);
	const navigate = useNavigate();
	const user = useSelector((state) => state.userProfile);

	//	if (!user) return <div>Loading...</div>;
	return (
		<Container>
			<div className="btn-language">
				<button className={language} onClick={onChangeLanguaje}>
					{t("home.button.text")}
				</button>
			</div>

			{false ? (
				<div>Debes ser al menos admin</div>
			) : (
				<div className="portada">
					{/* <div className="portada-image">
						<img src={GameMatch} className="image-game" alt="" />

						<img src={iconApp} className="image-icon" alt="" />
					</div> */}
					<div className="form">
						💜{t("welcome_home")}:
						<h1 style={{ fontFamily: "monospace", color: "	#FFD700" }}>
							꧁{user?.username}꧂
						</h1>
						<img className="image-game" alt="" src={user?.img} />
					</div>

					<button className="modify-btn" onClick={(e) => navigate(`/News`)}>
					🌐{t("news_panel_site")}
					</button>

					<button className="modify-btn" onClick={(e) => navigate(`/gamehome`)}>
					 🎮{t("games_panel_site")}
					</button>
					<button className="modify-btn" onClick={(e) => navigate(`/profilehome`)}>
					⚙️{t("users_panel_site")}
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
	.portada-image {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
		.image-icon {
			width: 2rem;
		}
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
	.form {
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
		background-color: #ba55d3;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 10px;
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
	.btn-language {
		height: 20px;
		width: 35px;
	}
	.en {
		color: #9a01e2;
		font-weight: bold;
		background-color: transparent;
		position: absolute;
		top: 0;
		right: 0;

		&:hover {
			font-size: 0;
			height: 20px;
			width: 35px;
			position: absolute;
			top: 0;
			right: 0;
			background-color: transparent;
			background-image: url(${enflag});
			background-image: no-repeat;
			background-size: cover;
		}
	}
	.es {
		color: #9a01e2;
		font-weight: bold;
		background-color: transparent;
		position: absolute;
		top: 0;
		right: 0;

		&:hover {
			font-size: 0;
			height: 20px;
			width: 35px;
			position: absolute;
			top: 0;
			right: 0;
			background-color: transparent;
			background-image: url(${esflag});
			background-image: no-repeat;
			background-size: cover;
		}
	}
`;
