import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { t } from "i18next";

export default function ProfileCard() {
	const dispatch = useDispatch();
	let [usersDB, setUserDB] = useState([]);
	const navigate = useNavigate();

	const user = useSelector((state) => state.aux);
	const profile = useSelector((state) => state.userProfile);
	useEffect(() => {
		dispatch(allUser());
	}, [dispatch]);

	const deleteButton = async (_id) => {
		// console.log(_id);

		const roles = profile.roles;
		const email = profile.email;
		try {
			fetch("https://backend-gamematch.herokuapp.com/users/" + _id, {
				method: "DELETE",
				headers: { Accept: "applcation/json", "Content-Type": "application/json" },
				body: JSON.stringify(profile),
			})
				.then((response) => {
					return response.json();
				})
				.then(() => {
					dispatch(allUser());
				});
			alert("deleted successfully: " + user.username);
		} catch (error) {
			console.error(error.message);
		}
	};
	//62f39a361fb29b83a353911f:user, 62f39a361fb29b83a3539121 adm

	//	if (!user) return <h2>Buscando usuarios...</h2>;
	return (
		<Container>
			{!user ? (
				<h2> Loading please wait... </h2>
			) : (
				user?.map((data) => (
					<div className="card-container">
						<div className="card" key={data.name}>
							<img className="card-image" src={data.img} alt="" key={data._id} />
							<h1 className="card-title" key={data.username}>
								{data.username}
							</h1>
							<div className="card-text">
								<p style={{ color: "violet" }}>{t("Type")}: </p>{" "}
								<strong style={{ color: "green" }} key={data.rol}>
									<i>{data.roles[0] === "62f39a361fb29b83a3539121" ? "Admin" : "User"}</i>
								</strong>
								<p style={{ color: "violet" }}> {t("ban")}:</p>{" "}
								<strong>
									{" "}
									<i style={{ color: "green" }} key={data.ban}>
										{data.ban.toString()}
									</i>
								</strong>
							</div>

							<button onClick={(e) => deleteButton(data._id)}>{t("delete")}</button>
							<button onClick={(e) => navigate(`/Users/${data._id}`)}>{t("modify")}</button>
						</div>
					</div>
				))
			)}
		</Container>
	);
}

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

	body {
		background: linear-gradient(90deg, black, #022a3c) fixed;
		padding: 50px;
		font-family: "Nunito", sans-serif;
		font-weight: 400em;
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
		background-color: #e6e6fa;
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
		color: purple;
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
		color: #fff;
		box-shadow: 0px 0px 11px 5px #000000;
	}

	.card .card-text {
		line-height: 20px;
		font-size: 400;
	}
`;
