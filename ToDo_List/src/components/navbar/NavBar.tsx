import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/themeContext";
import { logout } from "../../services/auth.service";


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
      {/* Logo / Home */}
      <Link to="/dashboard" className="logo">
        📝 TodoApp
      </Link>

      <div className="nav-actions">
        {/* Theme toggle */}
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Links según auth */}
        {user ? (
          <>
            <span className="user-email">{user.email}</span>

            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;