
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const foodData = [
  {
    id: 1,
    name: "Soya Chunks",
    calories: 345,
    protein: 52,
    carbs: 33,
    fat: 0.5,
    fiber: 13,
  },
  {
    id: 2,
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
  },
  {
    id: 3,
    name: "Egg",
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fat: 9.5,
    fiber: 0,
  },
  {
    id: 4,
    name: "Paneer",
    calories: 265,
    protein: 18,
    carbs: 6,
    fat: 20,
    fiber: 0,
  },
  {
    id: 5,
    name: "Sattu",
    calories: 380,
    protein: 22,
    carbs: 58,
    fat: 6,
    fiber: 15,
  },
  {
    id: 6,
    name: "Oats",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
  },
  {
    id: 7,
    name: "Banana",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
  },
  {
    id: 8,
    name: "Cooked Rice",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
  },
  {
    id: 9,
    name: "Dal",
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    fiber: 7.9,
  },
  {
    id: 10,
    name: "Milk",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
  },
];

function Food() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const foodId = Number(searchParams.get("foodId"));
  const meal = searchParams.get("meal") || "Breakfast";

  const selectedFood = foodData.find(
    (food) => food.id === foodId
  );

  const [grams, setGrams] = useState("");

  const gramsNumber = Number(grams);

  // Nutrition calculation algorithm
  // Food values are based on 100g.
  const calculateNutrition = (food, gramsValue) => {
    if (!food || gramsValue <= 0) {
      return null;
    }

    const factor = gramsValue / 100;

    return {
      calories: food.calories * factor,
      protein: food.protein * factor,
      carbs: food.carbs * factor,
      fat: food.fat * factor,
      fiber: food.fiber * factor,
    };
  };

  const nutrition = calculateNutrition(
    selectedFood,
    gramsNumber
  );

  const addFood = () => {
    if (!selectedFood) {
      alert("Food not found.");
      return;
    }

    if (!gramsNumber || gramsNumber <= 0) {
      alert("Please enter how many grams you ate.");
      return;
    }

    const data =
      JSON.parse(localStorage.getItem("foodData")) || {};

    const d = new Date();

    const month = d.toLocaleString("en-US", {
      month: "long",
    });

    const key = `${month}-${d.getDate()}`;

    if (!data[key]) {
      data[key] = {};
    }

    if (!data[key][meal]) {
      data[key][meal] = [];
    }

    const nutritionData = calculateNutrition(
      selectedFood,
      gramsNumber
    );

    const foodEntry = {
      name: selectedFood.name,
      grams: gramsNumber,

      calories: Number(
        nutritionData.calories.toFixed(2)
      ),

      protein: Number(
        nutritionData.protein.toFixed(2)
      ),

      carbs: Number(
        nutritionData.carbs.toFixed(2)
      ),

      fat: Number(
        nutritionData.fat.toFixed(2)
      ),

      fiber: Number(
        nutritionData.fiber.toFixed(2)
      ),
    };

    data[key][meal].push(foodEntry);

    localStorage.setItem(
      "foodData",
      JSON.stringify(data)
    );

    // Notify Home page
    window.dispatchEvent(
      new Event("foodUpdated")
    );

    // Go back to Home
    navigate("/");
  };

  if (!selectedFood) {
    return (
      <div className="food-page">
        <div className="food-form-card">
          <h2>Food not found</h2>

          <button
            className="save-food-btn"
            onClick={() => navigate("/food-name")}
          >
            Back to Foods
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="food-form-card">

        {/* Selected Food */}
        <div className="selected-food-header">

          <div>
            <p className="small-label">
              Adding to
            </p>

            <h1>
              {selectedFood.name}
            </h1>

            <p className="meal-name">
              Meal: {meal}
            </p>
          </div>

        </div>

        {/* Base Nutrition */}
        <div className="food-base-info">

          <div>
            <strong>
              {selectedFood.calories}
            </strong>
            <span>
              kcal / 100g
            </span>
          </div>

          <div>
            <strong>
              {selectedFood.protein}g
            </strong>
            <span>
              Protein
            </span>
          </div>

          <div>
            <strong>
              {selectedFood.carbs}g
            </strong>
            <span>
              Carbs
            </span>
          </div>

          <div>
            <strong>
              {selectedFood.fat}g
            </strong>
            <span>
              Fat
            </span>
          </div>

        </div>

        {/* Grams Card */}
        <div className="gram-section">

          <h2>
            How much did you eat?
          </h2>

          <p>
            Enter the amount you consumed in grams.
          </p>

          <label>
            Quantity
          </label>

          <div className="gram-input-wrapper">

            <input
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 100"
              value={grams}
              onChange={(e) =>
                setGrams(e.target.value)
              }
            />

            <span>
              grams
            </span>

          </div>

        </div>

        {/* Calculated Nutrition */}
        {nutrition && gramsNumber > 0 && (
          <div className="nutrition-preview">

            <h2>
              Nutrition for {gramsNumber}g
            </h2>

            <div className="nutrition-grid">

              <div>
                <strong>
                  {nutrition.calories.toFixed(1)}
                </strong>
                <span>
                  Calories
                </span>
              </div>

              <div>
                <strong>
                  {nutrition.protein.toFixed(1)}g
                </strong>
                <span>
                  Protein
                </span>
              </div>

              <div>
                <strong>
                  {nutrition.carbs.toFixed(1)}g
                </strong>
                <span>
                  Carbs
                </span>
              </div>

              <div>
                <strong>
                  {nutrition.fat.toFixed(1)}g
                </strong>
                <span>
                  Fat
                </span>
              </div>

              <div>
                <strong>
                  {nutrition.fiber.toFixed(1)}g
                </strong>
                <span>
                  Fiber
                </span>
              </div>

            </div>

          </div>
        )}

        {/* Add Food */}
        <button
          className="save-food-btn"
          onClick={addFood}
        >
          Add Food
        </button>

      </div>

    </div>
  );
}

export default Food;

