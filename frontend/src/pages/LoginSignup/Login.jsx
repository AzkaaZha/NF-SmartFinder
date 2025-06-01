import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);

    };

    return (
        <div className='login-page'>
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
            <form>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>
                <Link to="/">Sign Up</Link>
            </button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="#">Forgot your password?</Link>
            <button>
                <Link to="/">Login</Link>
            </button>
            </form>
        </div>
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