import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"

function Header() {

  const [profile, setProfile] = useState({});

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("profile")) || {};

    setProfile(data);

  }, []);

  return (

    <div className="header">

      <Link
        to="/profile"
        className="profile-link"
      >

        {
          profile.photo ?

          <img
            src={profile.photo}
            alt="Profile"
            className="profile-img"
          />

          :

          <div className="profile-img">

            👤

          </div>

        }

      </Link>


      <div className="header-text">

        <h2>

          Body Transformation Tracker

        </h2>

        <p>

          Stay Healthy 💚

        </p>

      </div>


      <button className="notify-btn">

        🔔

      </button>

    </div>

  );

}

export default Header;