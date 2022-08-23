import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions";
import iconMenssage from "../../assets/iconMenssage.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const News = () => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	let [newsDB, setNews] = useState([]);
	const navigate = useNavigate();
	const user = useSelector((state) => state.userProfile);

	const news = useSelector((state) => state.news);
	// console.log(news);
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
				<button className="head-btn" onClick={(e) => navigate("/createNews")}>
					{t("create_a_new_story")}
				</button>
				<button className="head-btn" onClick={(e) => navigate("/panel")}>
					{t("go_to_panel")}
				</button>
				<h1>{t("news")}</h1>
			</div>

			<div className="content">
				{news &&
					news.length &&
					news.map((data) => (
						<div key={data._id} className="card-container">
							<div className="card">
								<div>
									<div>
										<img alt="" src={iconMenssage} className="image" />
									</div>
									<div>
										<h2 className="card-title">{t("developers")}</h2>
										<div className="card-text">
											<div>
												<div className="date">
													{moment(data.createdAt).format("MMMM d")} at{" "}
													{moment(data.createdAt).format("h:mm A")}
												</div>
											</div>
											<div className="title">{data.title}</div>
											<div className="description">{data.description}</div>
										</div>
									</div>
								</div>
								{user.roles[0].name === "Admin" || user.roles[0].name === "SuperAdmin" ? (
									<button className="btn-card" onClick={(e) => deleteButton(data._id)}>
										{t("delete")}
									</button>
								) : (
									""
								)}
								{user.roles[0].name === "Admin" || user.roles[0].name === "SuperAdmin" ? (
									<button
										className="btn-card"
										onClick={(e) => navigate(`/News/${data._id}`)}
									>
										{t("modify")}
									</button>
								) : (
									""
								)}
							</div>
						</div>
					))}
			</div>
		</Container>
	);
};

export default News;

const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #5f0f99;
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.content {
		height: 100%;
		width: 100%;
		display: grid;
		flex-direction: row;
		grid-template-columns: repeat(3, minmax(200px, 1fr));
		align-items: stretch;
		gap: 3em;
		align-items: center;
		background-color: #5f0f99;
		.image {
			height: 100px;
			width: 100px;
			background-position: center center;
			background-size: cover;
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
			background: #5b146c;
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
		.btn-card {
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
		.card .card-title {
			padding: 20px 10px;
			font-size: 1.5rem;
			text-transform: uppercase;
			text-shadow: 1px 0px 2px #262654;
		}
		.card .card-text {
			margin-bottom: 1em;
			line-height: 20px;
			font-size: 20px;
			color: #f2f0f1;
		}
	}

	.portada {
		padding: 30px;
		text-align: center;
		background: black;
		color: white;
		font-size: 30px;
		width: 100%;

		.head-btn {
			min-width: 50%;
			margin-top: 1px;
			position: relative;
			top: -2rem;
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

		.image-game {
			margin-top: 2rem;
			height: 12rem;
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
