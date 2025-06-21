import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Page = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: 0;
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;

  &.overlay-left {
    transform: translateX(-20%);
  }

  &.overlay-right {
    right: 0;
    transform: translateX(0);
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #2b6eff, #a4c9e0);
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;

  &.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }

  &.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  &.right-panel-active ${OverlayContainer} {
    transform: translateX(-100%);
  }

  &.right-panel-active ${Overlay} {
    transform: translateX(50%);
  }

  &.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  &.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
`;

export const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  width: 50%;
  z-index: 2;

  &.sign-in-container {
    left: 0;
  }

  &.sign-up-container {
    left: 0;
    opacity: 0;
    z-index: 1;
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const LogoImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-weight: bold;
  margin: 0;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  margin: 20px 0 30px;
`;

export const Anchor = styled(Link)`
  font-size: 14px;
  color: #333;
  text-decoration: none;
  margin: 15px 0;
`;

