import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNews, getNew } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validate = yup.object({
	title: yup.string().required().min(6),
	description: yup.string().required().min(10),
	author: yup.string().min(2),
});

export default function EditNews() {
	const { t, i18n } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const review = useSelector((state) => state.newSelect);
	const userActive = useSelector((state) => state.userProfile);

	// console.log(review);

	useEffect(() => {
		dispatch(getNew(params._id));
	}, []);

	const submit = (values) => {
		// console.log(values);
		dispatch(editNews(values));
		navigate("/news");
	};

	if (!review) return <h2>Cargando</h2>;
	// {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

	return (
		<Container>
			<div>
				<img
					className="image"
					src="https://art.pixilart.com/5d3816468847327.gif"
					alt=""
					key={review._id}
				/>
				<h1>
					<i style={{ fontFamily: "monospace", color: "	#E6E6FA" }}>✒️{t("edit_new")} </i>
				</h1>
				<h2 style={{ fontFamily: "monospace", color: "		#F0E68C" }}>{review.name}</h2>{" "}
				<div></div>
			</div>
			<div style={{ marginLeft: "-800px", position: "fixed" }}>
				<button onClick={(e) => navigate("/panel")}>{t("Home")}</button>
				<button onClick={(e) => navigate("/news")}> {t("back")}</button>
			</div>
			<div className="portada">
				{
					<Formik
						initialValues={{
							title: review.title,
							description: review.description,
							author: review.author,
							editedBy: review.author,
							_id: review._id,
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<Form>
									<TextField
										className="input"
										label={t("title")}
										name="title"
										type="text"
										placeholder={review.title}
									/>
									<TextField
										multiline
										className="input"
										label={t("description")}
										name="description"
										type="text"
										placeholder={review.description}
									/>
									<TextField
										className="input"
										label={t("author")}
										name="author"
										type="text"
										placeholder={review.author}
									/>
									<TextField
										className="input"
										label={t("edit_by")}
										name="editedBy"
										type="text"
										placeholder={review.author}
									/>
									<TextField
										className="input"
										label="id"
										name="_id"
										type="text"
										placeholder={review._id}
									/>

									<button className="button" type="submit">
										{t("modify")}
									</button>
								</Form>
							</div>
						)}
					</Formik>
				}
			</div>
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
	color: #4b0082;
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
		border-radius: 10%;
		margin-top: 2rem;
		height: 250px;
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
		background-color: #e6e6fa;
		border-radius: 2rem;
		padding: 5rem;
		color: #800080;
		font-size: 1.5rem;
	}
	h1 {
		color: #4b0082;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: #4b0082;
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
