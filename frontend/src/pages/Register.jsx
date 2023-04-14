import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if ((username, email, password, confirmPassword) === "") {
      toast.error("Input fields cannot be empty !", toastOptions)
    }
    else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password doesn't match !",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Please enter a username that is at least 3 characters long !",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Please enter a password that is at least 8 characters long !",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>SIGNALv2</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000;
  padding: 50px;
  font-family: "Courier New", Courier, monospace;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #0f0;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    width:35%;
    flex-direction: column;
    gap: 2rem;
    background-color: #222;
    border-radius: 2rem;
    padding: 3rem 5rem;
    padding: 3rem;
    box-shadow: 0 0 10px #0f0;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #0f0;
    border-radius: 0.4rem;
    color: #0f0;
    width: 100%;
    font-size: 1rem;
    font-family: "Courier New", Courier, monospace;

    &:focus {
      border: 0.1rem solid #0f0;
      outline: none;
    }
  }

  button {
    background-color: #0f0;
    color: #000;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: "Courier New", Courier, monospace;

    &:hover {
      background-color: white;
    }
  }

  span {
    color: #0f0;
    text-transform: uppercase;
    font-size: 1.2rem;
    font-family: "Courier New", Courier, monospace;

    a {
      color: #0f0;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: white;
      }
    }
  }
`;


// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   ${'' /* background-color: #131324; */}
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: #15da21;
//       text-transform: uppercase;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     ${'' /* background-color: #00000076; */}
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #15da21;
//     border-radius: 0.4rem;
//     color: black;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid black;
//       outline: none;
//     }
//   }
//   button {
//     background-color: #15da21;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: black;
//     }
//   }
//   span {
//     color: black;
//     text-transform: uppercase;
//     a {
//       color: #15da21;
//       text-decoration: none;
//       font-weight: bold;
//       &:hover {
//         color: black;
//       }
//     }
//   }
// `;
