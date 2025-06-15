import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Page,
  Container,
  FormContainer,
  OverlayContainer,
  Overlay,
  OverlayPanel,
  Form,
  Input,
  Title,
  Paragraph,
  Anchor,
} from '../login/Login.styled';
import Button from "../../../components/ui/Button/Button"

function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        alert("Login gagal: token tidak ditemukan!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Terjadi kesalahan saat login");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      if (response.data?.user) {
        alert("Registrasi berhasil, silakan login!");
        setIsRightPanelActive(false);
      } else {
        alert("Registrasi gagal");
      }
    } catch (err) {
      console.error("Register error:", err);
      const errorMessages = Object.values(err.response?.data?.errors || {})
        .flat().join('\n');
      alert("Registrasi gagal:\n" + errorMessages);
    }
  };

  return (
    <Page>
      <Container className={isRightPanelActive ? 'right-panel-active' : ''}>
        {/* Register */}
        <FormContainer className="sign-up-container">
          <Form onSubmit={handleRegister}>
            <Title>Create Account</Title>
            <Input type="text" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
            <Input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            <Button variant='outline' type="submit">Sign Up</Button>
          </Form>
        </FormContainer>

        {/* Login */}
        <FormContainer className="sign-in-container">
          <Form onSubmit={handleLogin}>
            <Title>Login</Title>
            <Input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <Anchor to="#">Forgot your password?</Anchor>
            <Button variant='outline' type="submit">Login</Button>
          </Form>
        </FormContainer>

        {/* Overlay */}
        <OverlayContainer>
          <Overlay>
            <OverlayPanel className="overlay-left">
              <Title>Hello Civitas STT Terpadu Nurul Fikri</Title>
              <Paragraph>Login untuk melanjutkan pencarian atau klaim barang Anda di NF SMARTFINDER.</Paragraph>
              <Button variant='outline' onClick={handleSignInClick}>Login</Button>
            </OverlayPanel>
            <OverlayPanel className="overlay-right">
              <Title>Hello Civitas STT Terpadu Nurul Fikri</Title>
              <Paragraph>Gabung bersama kami dan mulai temukan atau bantu temukan barang hilang di lingkungan kampus STT Terpadu Nurul Fikri</Paragraph>
              <Button variant='outline' onClick={handleSignUpClick}>Register</Button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </Page>
  );
}

export default Login;
