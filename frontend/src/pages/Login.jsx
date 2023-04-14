import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Please fill out both fields !", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Please fill out both fields !", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Register here</Link>
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
  background-color: #1c1c1c;
  font-family: 'Courier New', Courier, monospace;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #1aff1a;
      text-transform: uppercase;
      font-size: 3rem;
      letter-spacing: 0.5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0f0f0f;
    border-radius: 2rem;
    padding: 5rem;
    box-shadow: 0 0 10px #1aff1a;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.2rem solid #1aff1a;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    font-family: 'Courier New', Courier, monospace;
    &:focus {
      border: 0.2rem solid #1aff1a;
      outline: none;
    }
  }

  button {
    background-color: #1aff1a;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: 'Courier New', Courier, monospace;
    &:hover {
      background-color: white;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    font-family: 'Courier New', Courier, monospace;
    a {
      color: #1aff1a;
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
//     padding: 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #15da21;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #15da21;
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
