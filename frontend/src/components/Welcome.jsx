import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
// import Matrix from "../assets/matrix.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  return (
    <Container>
      {/* <BackgroundImage src={Matrix} /> */}
      <Content>
        <WelcomeTitle src={Robot} alt="" />
        <Title>
          <span>{userName}</span>, Welcome to the SIGNALv2!
        </Title>
        <Description>Please select a chat to start messaging.</Description>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  color: #00ff00;
`;

const WelcomeTitle = styled.img`
  height: 20rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem 0;
  span {
    color: #fff;
  }
`;

const Description = styled.h3`
  font-size: 2rem;
  text-align: center;
  color: #fff;
`;

