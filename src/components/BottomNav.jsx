import { useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav">

      {/* HOME */}
      <button
        className={`bottom-nav-item ${
          isActive("/") ? "active" : ""
        }`}
        onClick={() => navigate("/")}
      >
        <div className="bottom-nav-icon">
          🏠
        </div>

        <span>Home</span>
      </button>


      {/* ACTIVITY */}
      <button
        className={`bottom-nav-item ${
          isActive("/activity") ? "active" : ""
        }`}
        onClick={() => navigate("/activity")}
      >
        <div className="bottom-nav-icon">
          📊
        </div>

        <span>Activity</span>
      </button>


      {/* FOOD */}
      <button
        className={`bottom-nav-item ${
          isActive("/food") ? "active" : ""
        }`}
        onClick={() => navigate("/food")}
      >
        <div className="bottom-nav-icon">
          🍎
        </div>

        <span>Food</span>
      </button>


      {/* PROFILE */}
      <button
        className={`bottom-nav-item ${
          isActive("/profile") ? "active" : ""
        }`}
        onClick={() => navigate("/profile")}
      >
        <div className="bottom-nav-icon">
          👤
        </div>

        <span>Profile</span>
      </button>

    </nav>
  );
}

export default BottomNav;