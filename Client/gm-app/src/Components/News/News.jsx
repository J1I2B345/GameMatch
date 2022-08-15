import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions";
import iconMenssage from "../../assets/iconMenssage.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const News = () => {
	const dispatch = useDispatch();
	let [newsDB, setNews] = useState([]);
	const navigate = useNavigate();
	const user = useSelector((state) => state.userProfile);

	const news = useSelector((state) => state.news);
	console.log(news);
	useEffect(() => {
		dispatch(getAllNews());
	}, [dispatch]);

	if (!user) return <div>Loading...</div>;
	if (!news) return <h2>Buscando news...</h2>;

	const deleteButton = async (id) => {
		try {
			// console.log({ id });
			await axios
				.delete(`https://backend-gamematch.herokuapp.com/News/delete/${id}`)
				.then(() => {
					dispatch(getAllNews());
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	// console.log({ news });
	return (
		<Container>
			<div className="portada">
				<h1>News</h1>
				<button className="modify-btn" onClick={(e) => navigate("/createNews")}>
					Crear Noticia
				</button>
				<button onClick={(e) => navigate("/panel")}>Ir a Panel</button>
			</div>

			<div>
				{news &&
					news.length &&
					news.map((data) => (
						<div key={data._id} className="container">
							<div>
								<div>
									<img alt="" src={iconMenssage} className="image" />
								</div>
								<div>
									<h2 className="user">Developers</h2>
									<div className="date">
										{moment(data.createdAt).format("MMMM d")} at{" "}
										{moment(data.createdAt).format("h:mm A")}
									</div>
								</div>
							</div>
							<div className="title">{data.title}</div>
							<div className="description">{data.description}</div>
							{user.roles[0].name === "Admin" ||
							user.roles[0].name === "SuperAdmin" ? (
								<button
									className="modify-btn"
									onClick={(e) => navigate(`/News/${data._id}`)}
								>
									Modificar
								</button>
							) : (
								""
							)}
							{user.roles[0].name === "Admin" ||
							user.roles[0].name === "SuperAdmin" ? (
								<button
									className="delete-btn"
									onClick={(e) => deleteButton(data._id)}
								>
									Eliminar
								</button>
							) : (
								""
							)}
						</div>
					))}
			</div>
		</Container>
	);
};

export default News;

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
