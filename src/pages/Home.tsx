import { Link } from "react-router-dom";
import "./style.css";

export const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Organiza tu día con <span>TodoApp</span>
          </h1>
          <p>
            Gestiona tus tareas de forma simple, rápida y desde cualquier lugar.
          </p>

          <div className="hero-buttons">
            <Link to="/tasks" className="btn primary">
              Ver tareas
            </Link>
            <Link to="/login" className="btn secondary">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>📌 Organización</h3>
          <p>Controla todas tus tareas en un solo lugar.</p>
        </div>

        <div className="card">
          <h3>⚡ Rápido</h3>
          <p>Interfaz optimizada para máxima productividad.</p>
        </div>

        <div className="card">
          <h3>☁️ En la nube</h3>
          <p>Accede a tus tareas desde cualquier dispositivo.</p>
        </div>
      </section>
    </div>
  );
};

