import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4659987`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Choose your avatar", toastOptions);
      return;
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading || avatars.length === 0 ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #0c0c0c;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: #0AFF16;
      font-size: 3rem;
      font-weight: bold;
      text-align: center;
      text-shadow: 0 0 10px #0AFF16, 0 0 20px #0AFF16, 0 0 30px #0AFF16,
        0 0 40px #0AFF16, 0 0 50px #0AFF16, 0 0 60px #0AFF16, 0 0 70px #0AFF16;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      box-shadow: 0px 0px 20px 0px rgba(10, 255, 22, 0.75);

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #15da21;
      box-shadow: 0px 0px 20px 0px #15da21;
    }
  }
  .submit-btn {
    background-color: #0AFF16;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 0px 20px 0px rgba(10, 255, 22, 0.75);

    &:hover {
      background-color: black;
      color: #0AFF16;
      box-shadow: 0px 0px 30px 0px rgba(10, 255, 22, 1);
      transform: scale(1.05);
    }
  }

  .Toastify__toast {
    background-color: #0AFF16;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0px 0px 20px 0px rgba(10, 255, 22, 0.75);
  }

  .Toastify__close-button {
    color: black;
  }

  .Toastify__progress-bar {
    background-color: #15da21;
  }
`;


// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 3rem;
//   background-color: black;
//   height: 100vh;
//   width: 100vw;

//   .loader {
//     max-inline-size: 100%;
   
//   }

//   .title-container {
//     h1 {
//       color: black;
//     }
//   }
//   .avatars {
//     display: flex;
//     gap: 2rem;

//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       img {
//         height: 6rem;
//         transition: 0.5s ease-in-out;
//       }
//     }
//     .selected {
//       border: 0.4rem solid #15da21;
//     }
//   }
//   .submit-btn {
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
// `;
