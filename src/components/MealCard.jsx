import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MealCard.css";

function MealCard({ title, icon, type }) {
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const updateCalories = () => {
      try {
        const foodData = JSON.parse(
          localStorage.getItem("foodData") || "{}"
        );

        const date = new Date();

        const month = date.toLocaleString("en-US", {
          month: "long",
        });

        const key = `${month}-${date.getDate()}`;

        const mealItems = foodData?.[key]?.[type] || [];

        const totalCalories = mealItems.reduce(
          (sum, item) => sum + Number(item?.calories || 0),
          0
        );

        setCalories(totalCalories);
      } catch (error) {
        console.error("Unable to read food data:", error);
        setCalories(0);
      }
    };

    updateCalories();

    // Agar foodData kisi aur component se update ho
    window.addEventListener("storage", updateCalories);

    return () => {
      window.removeEventListener("storage", updateCalories);
    };
  }, [type]);

  return (
    <div className="meal-card">
      <div className="meal-top">
        <div className="meal-icon">
          {icon}
        </div>

        <div className="meal-info">
          <h3>{title}</h3>
          <p>
            <span>{calories}</span> kcal
          </p>
        </div>
      </div>

      <Link to={`/food?meal=${type}`} className="meal-link">
        <button className="meal-btn">
          <span className="plus-icon">+</span>
          Add Food
        </button>
      </Link>
    </div>
  );
}

export default MealCard;