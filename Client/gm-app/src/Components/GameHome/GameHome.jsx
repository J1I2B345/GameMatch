import React from "react";
import GameCard from "../GamesCard/GameCard";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GameHome = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <h1>Seleciona tu juego</h1>
        <button onClick={(e) => navigate("/panel")}>Ir a Panel</button>
        <button onClick={(e) => navigate("/creategame")}>Crear Juego</button>
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
