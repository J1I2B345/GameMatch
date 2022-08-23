import React from "react";
import GameCard from "../GamesCard/GameCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GameHome = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	return (
		<Container>
			<div className="portada">
				<div>
					<p></p>
				</div>
				<div style={{ position: "fixed", width: "100%", height: "100%" }}>
					<button className="head-btn" onClick={(e) => navigate("/panel")}>
						{t("Home")}
					</button>
					<button className="head-btn" onClick={(e) => navigate("/creategame")}>
						{t("create_a_game")}
					</button>
				</div>
				<h1>{t("select game")}</h1>
			</div>
			<GameCard />
		</Container>
	);
};

export default GameHome;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #8f0f99;
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
    background-color: #7a01e2;
    color: #f2f0f1;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #5e5eff;
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
  .portada {
		padding: 50px;
		text-align: center;
    background-color: #60f99;
		color: white;
		font-size: 30px;
		width: 100%;

		.head-btn {
		min-width: 50%;
	    margin-top: 1px;
    	position:relative;
     	top:-2rem;
	}
`;
