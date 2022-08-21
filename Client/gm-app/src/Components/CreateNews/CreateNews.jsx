import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validate = yup.object({
	title: yup.string().required().min(6),
	description: yup.string().required().min(10),
	author: yup.string().min(2),
});

export default function CreateNews() {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.userProfile);

	const submit = (values, actions) => {
		dispatch(createNews(values));
		actions.resetForm();
	};

	return (
		<Container>
			<div className="portada">
				{
					<Formik
						initialValues={{
							title: "",
							description: "",
							author: user._id,
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<h1>{t("create_new_story")}</h1>
								<Form>
									<TextField
										className="input"
										label={t("title")}
										name="title"
										type="text"
										placeholder="Titulo de la noticia"
									/>
									<TextField
										className="input"
										label={t("description")}
										name="description"
										type="text"
										placeholder="Narracion"
									/>
									<TextField
										className="input"
										label={t("author")}
										name="author"
										type="text"
										placeholder={user._id}
									/>

									<button className="button" type="submit">
										{t("create")}
									</button>
								</Form>
							</div>
						)}
					</Formik>
				}
				<button onClick={(e) => navigate("/panel")}>{t("go_to_panel")}</button>
				<button onClick={(e) => navigate("/news")}>{t("go_to_news")}</button>
			</div>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
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
		min-height: 100vh;
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
