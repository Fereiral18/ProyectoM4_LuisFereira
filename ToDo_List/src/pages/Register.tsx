import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al registrarse");
    }
  };

  return (
    <div className="auth-container">
      
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Crea tu cuenta</h2>
        <p>Empieza a organizar tus tareas</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;