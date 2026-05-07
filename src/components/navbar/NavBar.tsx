import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/themeContext";
import { logout } from "../../services/auth.service";
import "./style.css";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
       MetaCodeApp
      </Link>

      <div className="nav-actions">
        {/* Theme toggle */}
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <>
            <span className="user-email">{user.email}</span>

            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link register">
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;