import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error login Google:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

      <form  onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        <p>Inicia sesión para continuar</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
      </form>

        <button type="submit" className="login-btn">
          Ingresar
        </button>
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
