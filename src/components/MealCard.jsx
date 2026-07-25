import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MealCard.css";

function MealCard({ title, icon, type }) {

  const [calories, setCalories] = useState(0);

  useEffect(() => {

    const food =
      JSON.parse(localStorage.getItem("foodData")) || {};

    const d = new Date();

    const month =
      d.toLocaleString("en-US",{month:"long"});

    const key =
      `${month}-${d.getDate()}`;

    if(food[key] && food[key][type]){

      const total =
      food[key][type].reduce(
        (sum,item)=>sum+Number(item.calories),
        0
      );

      setCalories(total);

    }

  },[]);

  return(

    <div className="meal-card">

      <div className="meal-top">

        <h2>{icon}</h2>

        <div>

          <h3>{title}</h3>

          <p>{calories} kcal</p>

        </div>

      </div>

      <Link to={`/food?meal=${type}`}>

        <button className="meal-btn">

          + Add Food

        </button>

      </Link>

    </div>

  );

}

export default MealCard;