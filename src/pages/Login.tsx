import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { login } from "../services/auth.service";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  // 🔵 LOGIN EMAIL / PASSWORD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/tasks");
    } catch (error) {
      console.error("Error login email:", error);
      alert("Error al iniciar sesión con email/password");
    }
  };

  // 🔴 LOGIN GOOGLE
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/tasks");
    } catch (error) {
      console.error("Error login Google:", error);
      alert("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <form onSubmit={handleSubmit}>
          <h2>Bienvenido</h2>
          <p>Inicia sesión para continuar</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Iniciar sesión con Google
        </button>

      </div>
    </div>
  );
};

export default Login;