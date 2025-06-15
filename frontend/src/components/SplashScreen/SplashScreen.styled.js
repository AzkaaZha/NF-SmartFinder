import styled, { keyframes } from "styled-components";

export const logoAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: ${(props) => (props.isFinished ? 0 : 1)};
  visibility: ${(props) => (props.isFinished ? 'hidden' : 'visible')};
  transition: opacity 1s ease-out;
`;

export const LogoContainer = styled.div`
  animation: ${logoAnimation} 2s ease-in-out infinite;
`;

export const Logo = styled.img`
  width: 300px;
  height: auto;
`;