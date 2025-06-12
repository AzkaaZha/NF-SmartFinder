import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        alert("Login gagal: token tidak ditemukan!");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        alert("Gagal login: " + err.response.data.message);
      } else {
        alert("Terjadi kesalahan saat login");
      }
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

      if (response.data && response.data.user) {
        alert("Registrasi berhasil, silakan login!");
        setIsRightPanelActive(false); // Kembali ke login form
      } else {
        alert("Registrasi gagal");
      }
    } catch (err) {
      console.error("Register error:", err);

      if (err.response && err.response.data && err.response.data.errors) {
        console.log("Validation errors:", err.response.data.errors); // 👈 Tambahkan ini

        // Ambil pesan error-nya dan tampilkan
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join('\n');

        alert("Registrasi gagal:\n" + errorMessages);
      } else {
        alert("Terjadi kesalahan saat registrasi");
      }
    }
  };

  return (
    <div className='login-page'>
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>

        {/* REGISTER */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
            <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* LOGIN */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <Link to="#">Forgot your password?</Link>
            <button type="submit">Login</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
