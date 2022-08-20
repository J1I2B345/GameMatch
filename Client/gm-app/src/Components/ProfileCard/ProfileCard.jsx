import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function ProfileCard() {
	const dispatch = useDispatch();
	let [usersDB, setUserDB] = useState([]);
	const navigate = useNavigate();

	const user = useSelector((state) => state.aux);
	console.log({ c: user.map((t) => t.roles[0]) });

	useEffect(() => {
		dispatch(allUser());
	}, [dispatch]);

	const deleteButton = async (_id) => {
		console.log(_id);
		try {
			await axios
				.delete(`https://backend-gamematch.herokuapp.com/Users/${_id}`)
				.then(() => {
					dispatch(allUser());
				});
		} catch (error) {
			console.error(error.message);
		}
	};
	//62f39a361fb29b83a353911f:user, 62f39a361fb29b83a3539121 adm

	if (!user) return <h2>Buscando usuarios...</h2>;
	return (
		<Container>
			{user.map((data) => (
				<div className="card-container">
					<div className="card" key={data.name}>
						<img className="card-image" src={data.img} alt="" key={data._id} />
						<h1 className="card-title" key={data.username}>
							Usuario: {data.username}
						</h1>
						<div className="card-text">
							<p key={data.rol}>
								Rol actual:
								{data.roles[0] === "62f39a361fb29b83a3539121" ? "admin" : "user"}
							</p>
							<p key={data.ban}>Ban: {data.ban.toString()}</p>
						</div>

						<button onClick={(e) => deleteButton(data._id)}>Eliminar</button>
						<button onClick={(e) => navigate(`/Users/${data._id}`)}>Modificar</button>
					</div>
				</div>
			))}
		</Container>
	);
}

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	flex-direction: row;
	grid-template-columns: repeat(3, minmax(280px, 1fr));
	align-items: stretch;
	gap: 3rem;
	align-items: center;
	background-color: #5f0f99;

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background: linear-gradient(90deg, black, #022a3c) fixed;
		padding: 50px;
		font-family: "Nunito", sans-serif;
		font-weight: 400;
	}

	button {
		background-color: #9a01e2;
		color: #f2f0f1;
		width: 100%;
		margin-bottom: 1rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.2rem;
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
		width: 300px;
		height: auto;
		position: relative;
		background: #fff;
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
	.card .card-image {
		height: 200px;
		width: 200px;
		border: 5px double #022a3c;
		border-radius: 50%;
		background-position: center center;
		background-size: cover;
	}
	.card .card-title {
		padding: 20px 10px;
		font-size: 1.5rem;
		text-transform: uppercase;
		text-shadow: 1px 0px 2px #262654;
	}
	.card:nth-child(1) .card-image {
		background-image: url(coding.jpg);
	}
	.card:nth-child(2) .card-image {
		background-image: url(cooking.jpg);
	}
	.card:nth-child(3) .card-image {
		background-image: url(cycling.jpg);
	}
	.card:hover {
		background: #e84393;
		color: #fff;
		box-shadow: 0px 0px 11px 5px #000000;
	}

	.card .card-text {
		line-height: 20px;
		font-size: 400;
	}
`;
