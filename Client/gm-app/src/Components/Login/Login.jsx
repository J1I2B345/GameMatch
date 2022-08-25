import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser, login } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import GameMatch from "../../assets/GameMatch.png";
import iconApp from "../../assets/iconApp.png";

const validate = yup.object({
	email: yup.string().required().min(3).email(),
	password: yup.string().required().min(3),
});

export default function Login() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const user = useSelector((state) => state.aux);
	// console.log(user);

	useEffect(() => {
		dispatch(allUser());
	}, []);

	const submit = async (values, actions) => {
		//console.log(values);
		if (!user.map((d) => d.email).includes(values.email)) {
			alert("💌Email not found,try againヾ(≧▽≦*)o ");
			return;
		}
		const is = "62f39a361fb29b83a3539121";
		const users = user.find((d) => d.email === values.email);
		console.log(users);
		if (users.roles[0] !== "62f39a361fb29b83a3539121") {
			return alert("The site es only for admins. :)");
		}
		// if (
		// 	!user.map((d) => d.email && d.password).includes(values.email && values.password)
		// ) {
		// 	alert("❔Password invalid,try againヾ(≧▽≦*)o");
		// 	return;
		// }

		try {
			let res = await axios.post(
				"https://backend-gamematch.herokuapp.com/users/login",
				values
			);

			console.log(res.data);
			dispatch(login(values));
			navigation("/panel");
		} catch (error) {
			alert("❔Password invalid,try againヾ(≧▽≦*)o");

			console.log({ message: error.message });
		}

		//  dispatch(login(values));
		// navigation("/selectgame");
	};
	return (
		<Container className="container">
			<div className="container-img-game">
				<div className="portada_text">
					<img src={GameMatch} className="image-game" alt="" />
				</div>
				<div className="container-img-icon">
					{/* <img src={iconApp} className="image-icon" alt="" /> */}
				</div>
			</div>
			<div className="form-container">
				{
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={validate}
						onSubmit={submit}
					>
						{(formik) => (
							<div>
								<Form>
									<h1 style={{ fontFamily: "monospace", color: "	#8B008B" }}>
										꧁Admin Panel꧂
									</h1>
									{/* <label className="se"><h1>Hi!, Welcome Back</h1></label> */}
									<TextField
										className="input"
										label="📧 Email Address"
										name="email"
										type="text"
										placeholder="email@example.com..."
									/>
									<TextField
										className="input"
										label="✳ Password"
										name="password"
										type="password"
										placeholder="password"
									/>

									<button type="submit">Login</button>
								</Form>
							</div>
						)}
					</Formik>
				}
				<div className="container">
					<p></p>
					<p></p>
					<div className="container">
						<p></p>
					</div>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p style={{ fontFamily: "monospace", color: "	#fff" }}>
						@GameMatch-2022 All rigths reserved{" "}
					</p>
					<p></p> <p></p>
					<p></p>
				</div>
			</div>
			{/* <div>
				Don't have account?
				<Link to="/register">
					<div className="register-link">Register</div>
					<div className="container-img-game">
						<h1></h1>
					</div>
					<div className="container-img-game">
						<h1></h1>
					</div>
				</Link>
			</div> */}
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
	background-color: #4f0f99;
	background-size: cover;
	color: #4b0082;

	.image-game {
		margin-top: 2rem;
		height: 10rem;
	}
	.image-icon {
		margin-top: 2rem;
		height: 3rem;
	}
	.register-link {
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
		color: #f0ebf2;
		text-transform: uppercase;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: #4b0082;
		width: 80%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
	}
	button {
		background-color: #9a01e2;
		color: white;
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
		color: #4b0082;
		text-transform: uppercase;
		a {
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold;
		}
	}
`;
