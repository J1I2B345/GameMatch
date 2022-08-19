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
	// console.log({ user });

	useEffect(() => {
		dispatch(allUser());
	}, []);

	const deleteButton = async (_id) => {
		console.log(_id);
		try {
			await axios
				.delete(`https://backend-gamematch.herokuapp.com/User/${_id}`)
				.then(() => {
					dispatch(allUser());
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	if (!user) return <h2>Buscando usuarios...</h2>;
	return (
		<Container>
			{user.map((data) => (
				<div>
					<div className="container-profile" key={data.name}>
						<img className="image-profile" src={data.img} alt="" key={data._id} />
						<h1 key={data.username}>Usuario: {data.username}</h1>
						<p key={data.rol}>Rol actual:{data.roles}</p>
						<p key={data.password}>Ban: {data.ban.toString()}</p>
					</div>

					<button onClick={(e) => deleteButton(data._id)}>Eliminar</button>
					<button onClick={(e) => navigate(`/Users/${data._id}`)}>Modificar</button>
				</div>
			))}
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

	.container-profile {
		flex-direction: column;
		background-color: #9a01e2;
		padding: 0.5rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		max-width: 40rem;
	}
	.image-profile {
		margin-top: 2rem;
		margin-bottom: 3rem;
		border-radius: 30px;
		max-width: 30rem;
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
