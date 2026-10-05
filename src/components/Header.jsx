
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile")) || {};
    setProfile(data);
  }, []);

  return (
    <header className="hero">
      <div className="hero-content">

        {/* LEFT SIDE */}
        <div className="hero-left">

          {/* TOP BAR */}
          <div className="top-bar">
            <Link to="/profile" className="profile-link">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="profile-img"
                />
              ) : (
                <div className="profile-img profile-placeholder">
                  👤
                </div>
              )}
            </Link>

            <button className="notify-btn" type="button">
              🔔
            </button>
          </div>

          {/* MAIN TITLE */}
          <h1>
            <span className="title1">BODY.</span>
            <br />
            <span className="title2">TRANSFORMATION.</span>
            <br />
            <span className="title3">TRACKER.</span>
          </h1>

          {/* DESCRIPTION */}
          <p>
            Transform your body with smart nutrition,
            workouts, water tracking and detailed progress
            analytics.
          </p>

          {/* BUTTONS */}
          <div className="hero-buttons">
            <button type="button">
              🚀 Start Tracking
            </button>

            <button className="outline" type="button">
              📊 View Progress
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">

          {/* CENTER CIRCLE */}
          <div className="hero-circle">
            <img
              src="/bodybuilder.png"
              alt="Body transformation"
              className="hero-body-image"
            />
          </div>

          {/* FLOATING CARDS */}
          <div className="floating-card card1">
            <span>💪</span>
            <div>
              <strong>Workout</strong>
              <small>Stay active</small>
            </div>
          </div>

          <div className="floating-card card2">
            <span>🥗</span>
            <div>
              <strong>Nutrition</strong>
              <small>Eat better</small>
            </div>
          </div>

          <div className="floating-card card3">
            <span>📈</span>
            <div>
              <strong>Progress</strong>
              <small>Track growth</small>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;

