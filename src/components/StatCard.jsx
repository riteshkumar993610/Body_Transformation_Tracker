import { useEffect, useState } from "react";
import "./StatCard.css";

function StatCard() {

  const [profile, setProfile] = useState({});
  const [water, setWater] = useState(0);

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("profile")) || {};

    setProfile(data);

    const savedWater =
      Number(localStorage.getItem("water")) || 0;

    setWater(savedWater);

  }, []);

  const bmi =
    profile.height && profile.weight
      ? (
          Number(profile.weight) /
          Math.pow(Number(profile.height) / 100, 2)
        ).toFixed(1)
      : "--";

  const addWater = () => {

    const value = +(water + 0.5).toFixed(1);

    setWater(value);

    localStorage.setItem("water", value);

  };

  const removeWater = () => {

    if (water <= 0) return;

    const value = +(water - 0.5).toFixed(1);

    setWater(value);

    localStorage.setItem("water", value);

  };

  return (

    <div className="stats-grid">

      <div className="stat-box">
        <h2>⚖</h2>
        <h3>{profile.weight || "--"} kg</h3>
        <p>Weight</p>
      </div>

      <div className="stat-box">
        <h2>📏</h2>
        <h3>{profile.height || "--"} cm</h3>
        <p>Height</p>
      </div>

      <div className="stat-box">
        <h2>🧮</h2>
        <h3>{bmi}</h3>
        <p>BMI</p>
      </div>

      <div className="stat-box">

        <h2>💧</h2>

        <h3>{water} L</h3>

        <p>Water</p>

        <div className="water-btns">

          <button onClick={removeWater}>-</button>

          <button onClick={addWater}>+</button>

        </div>

      </div>

    </div>

  );

}

export default StatCard;