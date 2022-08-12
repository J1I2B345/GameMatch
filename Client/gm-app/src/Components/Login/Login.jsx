import { getUser } from "../../redux/actions";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GameMatch from "../../assets/GameMatch.png";
import iconApp from "../../assets/iconApp.png";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validateForm = () => {
    const { username, password } = user;
    if (username === "") {
      toast.error("user and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("user and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(getUser(user));
      navigate("/create");
    }
  };

  return (
    <>
      <Container className="container">
        <div className="portada">
          <div className="portada_text">
            <img src={GameMatch} className="imagen-game" alt="" />
          </div>
          <div className="portada_img">
            <img src={iconApp} className={{ width: 110, height: 110 }} alt="" />
          </div>
        </div>
        <form className="form_container" onSubmit={(e) => submit(e)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className="button" type="submit">
            submit
          </button>
        </form>
        <div
          className={{
            marginTop: 30,
            fontSize: 15,
            height: "auto",
          }}
        >
          <div
            className={{
              color: "gray",
            }}
          >
            Don't have account?{" "}
            <div
              className={{
                color: "white",
              }}
            >
              <Link to="/register"> Register</Link>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .imagen-game {
    margin-top: 10rem;
    height: 10rem;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
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
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
