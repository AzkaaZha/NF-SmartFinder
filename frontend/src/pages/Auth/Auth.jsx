import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../_services/auth";
import { Page, Container, FormContainer, OverlayContainer, Overlay, OverlayPanel, Form, Input,Title, Paragraph,Anchor } from "./Auth.styled";
import Button from "../../components/ui/Button/Button";

export default function Auth() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("accessToken", response?.token);
      localStorage.setItem("userInfo", JSON.stringify(response?.user));

      if (response.user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (response.user.role === "satpam") {
        navigate("/dashboardpam");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (response?.user) {
        alert("Registration successful, please login!");
        setIsRightPanelActive(false);
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container className={isRightPanelActive ? "right-panel-active" : ""}>
        {/* Register */}
        <FormContainer className="sign-up-container">
          <Form onSubmit={handleRegister}>
            <Title>Create Account</Title>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button variant="outline" type="submit">
              Sign Up
            </Button>
          </Form>
        </FormContainer>

        {/* Login */}
        <FormContainer className="sign-in-container">
          <Form onSubmit={handleLogin}>
            <Title>Login</Title>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Anchor to="#">Forgot your password?</Anchor>
            <Button variant="outline" type="submit">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Form>
        </FormContainer>

        {/* Overlay */}
        <OverlayContainer>
          <Overlay>
            <OverlayPanel className="overlay-left">
              <Title>Hello Civitas STT Terpadu Nurul Fikri</Title>
              <Paragraph>
                Login untuk melanjutkan pencarian atau klaim barang Anda di NF
                SMARTFINDER.
              </Paragraph>
              <Button variant="outline" onClick={handleSignInClick}>
                Login
              </Button>
            </OverlayPanel>
            <OverlayPanel className="overlay-right">
              <Title>Hello Civitas STT Terpadu Nurul Fikri</Title>
              <Paragraph>
                Gabung bersama kami dan mulai temukan atau bantu temukan barang
                hilang di lingkungan kampus STT Terpadu Nurul Fikri
              </Paragraph>
              <Button variant="outline" onClick={handleSignUpClick}>
                Register
              </Button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </Page>
  );
}
