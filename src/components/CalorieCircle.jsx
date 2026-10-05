import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CalorieCircle.css";

function Home() {
  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================

  const [goal, setGoal] = useState(1200);
  const [consumed, setConsumed] = useState(0);
  const [burned, setBurned] = useState(0);

  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  const [date, setDate] = useState(new Date());

  const [meals, setMeals] = useState({
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Snack: 0,
  });

  const [editingGoal, setEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(1200);

  // ==============================
  // LOAD DATA
  // ==============================

  useEffect(() => {
    loadData();
  }, [date]);

  // ==============================
  // REFRESH WHEN FOOD IS ADDED
  // ==============================

  useEffect(() => {
    const handleFoodUpdate = () => {
      loadData();
    };

    window.addEventListener(
      "foodUpdated",
      handleFoodUpdate
    );

    return () => {
      window.removeEventListener(
        "foodUpdated",
        handleFoodUpdate
      );
    };
  }, [date]);

  // ==============================
  // LOAD ALL DATA
  // ==============================

  const loadData = () => {

    // ==============================
    // PROFILE
    // ==============================

    const profile =
      JSON.parse(localStorage.getItem("profile")) || {};

    const calorieGoal =
      Number(profile.calorieGoal);

    if (calorieGoal > 0) {
      setGoal(calorieGoal);
      setNewGoal(calorieGoal);
    }

    // ==============================
    // DATE KEY
    // ==============================

    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    const key = `${month}-${date.getDate()}`;

    // ==============================
    // FOOD DATA
    // ==============================

    const food =
      JSON.parse(localStorage.getItem("foodData")) || {};

    let kcal = 0;
    let pro = 0;
    let carb = 0;
    let fats = 0;

    const mealCalories = {
      Breakfast: 0,
      Lunch: 0,
      Dinner: 0,
      Snack: 0,
    };

    if (food[key]) {

      Object.keys(food[key]).forEach((meal) => {

        if (!Array.isArray(food[key][meal])) {
          return;
        }

        food[key][meal].forEach((item) => {

          const calories =
            Number(item.calories) || 0;

          const proteinValue =
            Number(item.protein) || 0;

          const carbsValue =
            Number(item.carbs) || 0;

          const fatValue =
            Number(item.fat) || 0;

          kcal += calories;
          pro += proteinValue;
          carb += carbsValue;
          fats += fatValue;

          const mealName =
            meal.charAt(0).toUpperCase() +
            meal.slice(1);

          if (
            mealCalories[mealName] !== undefined
          ) {
            mealCalories[mealName] += calories;
          }

        });

      });

    }

    setConsumed(Math.round(kcal));

    setProtein(Math.round(pro));

    setCarbs(Math.round(carb));

    setFat(Math.round(fats));

    setMeals({
      Breakfast: Math.round(
        mealCalories.Breakfast
      ),
      Lunch: Math.round(
        mealCalories.Lunch
      ),
      Dinner: Math.round(
        mealCalories.Dinner
      ),
      Snack: Math.round(
        mealCalories.Snack
      ),
    });

    // ==============================
    // EXERCISE DATA
    // ==============================

    const exercise =
      JSON.parse(
        localStorage.getItem("exerciseData")
      ) || {};

    let totalBurned = 0;

    if (
      exercise[key] &&
      Array.isArray(exercise[key].exercises)
    ) {

      totalBurned =
        exercise[key].exercises.reduce(
          (sum, item) =>
            sum + (Number(item.kcal) || 0),
          0
        );

    }

    setBurned(Math.round(totalBurned));
  };

  // ==============================
  // CALORIE CALCULATION
  // ==============================

  const difference = goal - consumed;

  const isExtra = difference < 0;

  const amount = Math.abs(difference);

  // Circle kabhi 100% se jayda nhi ayega isase 
  const percent =
    goal > 0
      ? Math.min((consumed / goal) * 100, 100)
      : 0;

  // ==============================
  // SAVE TARGET
  // ==============================

  const saveGoal = () => {

    const value = Number(newGoal);

    if (!value || value <= 0) {
      return;
    }

    const profile =
      JSON.parse(
        localStorage.getItem("profile")
      ) || {};

    profile.calorieGoal = value;

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setGoal(value);

    setEditingGoal(false);
  };

  // ==============================
  // DATE
  // ==============================

  const previousDay = () => {

    const newDate = new Date(date);

    newDate.setDate(
      newDate.getDate() - 1
    );

    setDate(newDate);
  };

  const nextDay = () => {

    const newDate = new Date(date);

    newDate.setDate(
      newDate.getDate() + 1
    );

    setDate(newDate);
  };

  const day = date.toLocaleString("en-US", {
    weekday: "short",
  });

  const month = date.toLocaleString("en-US", {
    month: "long",
  });

  const dateNumber = date.getDate();

  // ==============================
  // MEAL CARD
  // ==============================

  const MealCard = ({ name, icon }) => {

    return (
      <div className="meal-card">

        <div className="meal-icon">
          {icon}
        </div>

        <div className="meal-info">

          <h3>
            {name}
          </h3>

          <p>
            {meals[name]} Kcal
          </p>

        </div>

        <button
          className="add-food"
          onClick={() =>
            navigate(
              `/food?meal=${name.toLowerCase()}`
            )
          }
        >
          +
        </button>

      </div>
    );
  };

  // ==============================
  // RETURN
  // ==============================

  return (

    <div className="home-page">

      <div className="home-container">

        {/* =========================
            DATE
        ========================= */}

        <div className="date-header">

          <button
            className="date-arrow"
            onClick={previousDay}
          >
            ‹
          </button>

          <div className="date-center">

            <span className="month-name">
              {month}
            </span>

            <h2>
              {dateNumber}
            </h2>

            <span className="day-name">
              {day}
            </span>

          </div>

          <button
            className="date-arrow"
            onClick={nextDay}
          >
            ›
          </button>

        </div>

        {/* =========================
            CALORIE SECTION
        ========================= */}

        <div className="calorie-section">

          {/* CONSUMED */}

          <div className="side-calorie">

            <span>
              Consumed
            </span>

            <strong>
              {consumed}
            </strong>

          </div>

          {/* CIRCLE */}

          <div
            className={`calorie-circle ${
              isExtra ? "extra-circle" : ""
            }`}
            style={{
              background: `
                conic-gradient(
                  #8bd316
                  ${percent * 3.6}deg,
                  #e4eeee
                  ${percent * 3.6}deg
                )
              `,
            }}
          >

            <div className="circle-inner">

              <h1>
                {amount}
              </h1>

              <span>
                {isExtra
                  ? "Kcal Extra"
                  : "Kcal Left"}
              </span>

            </div>

          </div>

          {/* TARGET */}

          <div className="side-calorie">

            <span>
              Target
            </span>

            <div className="target-value">

              <strong>
                {goal}
              </strong>

              <button
                className="edit-goal-btn"
                onClick={() =>
                  setEditingGoal(true)
                }
                title="Edit calorie target"
              >
                🖍️
              </button>

            </div>

          </div>

        </div>

        {/* =========================
            TARGET EDIT BOX
        ========================= */}

        {editingGoal && (

          <div className="goal-edit-box">

            <h3>
              Set Daily Calorie Target
            </h3>

            <div className="goal-input-row">

              <input
                type="number"
                min="1"
                value={newGoal}
                onChange={(e) =>
                  setNewGoal(e.target.value)
                }
                autoFocus
              />

              <span>
                Kcal
              </span>

            </div>

            <div className="goal-buttons">

              <button
                className="cancel-goal"
                onClick={() =>
                  setEditingGoal(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-goal"
                onClick={saveGoal}
              >
                Save
              </button>

            </div>

          </div>

        )}

        {/* =========================
            BURNED
        ========================= */}

        <div className="burned-box">

          <span>
            🔥 Burned
          </span>

          <strong>
            {burned} Kcal
          </strong>

        </div>

        {/* =========================
            MACROS
        ========================= */}

        <div className="macro-container">

          {/* CARBS */}

          <div className="macro-item">

            <div className="macro-title">

              <span>
                Carbs
              </span>

              <b>
                {carbs}g
              </b>

            </div>

            <div className="macro-bar">

              <div
                className="macro-fill carbs-fill"
                style={{
                  width: `${Math.min(
                    (carbs / 193) * 100,
                    100
                  )}%`,
                }}
              />

            </div>

            <small>
              {carbs}/193g
            </small>

          </div>

          {/* PROTEIN */}

          <div className="macro-item">

            <div className="macro-title">

              <span>
                Protein
              </span>

              <b>
                {protein}g
              </b>

            </div>

            <div className="macro-bar">

              <div
                className="macro-fill protein-fill"
                style={{
                  width: `${Math.min(
                    (protein / 77) * 100,
                    100
                  )}%`,
                }}
              />

            </div>

            <small>
              {protein}/77g
            </small>

          </div>

          {/* FAT */}

          <div className="macro-item">

            <div className="macro-title">

              <span>
                Fat
              </span>

              <b>
                {fat}g
              </b>

            </div>

            <div className="macro-bar">

              <div
                className="macro-fill fat-fill"
                style={{
                  width: `${Math.min(
                    (fat / 51) * 100,
                    100
                  )}%`,
                }}
              />

            </div>

            <small>
              {fat}/51g
            </small>

          </div>

        </div>

        {/* =========================
            TODAY'S MEALS
        ========================= */}

        <div className="meal-section">

          <h2>
            Today's Meals
          </h2>

          <div className="meal-grid">

            {/* BREAKFAST */}

            <MealCard
              name="Breakfast"
              icon="🥪"
            />

            {/* LUNCH */}

            <MealCard
              name="Lunch"
              icon="🍝"
            />

            {/* DINNER */}

            <MealCard
              name="Dinner"
              icon="🥗"
            />

            {/* SNACK */}

            <MealCard
              name="Snack"
              icon="🍪"
            />

          </div>

        </div>

      </div>

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <nav className="bottom-navigation">

      </nav>

    </div>
  );
}

export default Home;