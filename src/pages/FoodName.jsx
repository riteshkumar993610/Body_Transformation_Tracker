import { useState } from "react";
import "./FoodName.css";

const foodData = [
  {
    id: 1,
    name: "Soya Chunks",
    quantity: "100g",
    calories: 345,
    protein: 52,
    carbs: 33,
    fat: 0.5,
    category: "High Protein",
    description: "Bahut high-protein aur low-fat food."
  },
  {
    id: 2,
    name: "Chicken Breast",
    quantity: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: "High Protein",
    description: "Lean protein ka excellent source."
  },
  {
    id: 3,
    name: "Egg",
    quantity: "100g",
    calories: 143,
    protein: 12.6,
    carbs: 0.7,
    fat: 9.5,
    category: "High Protein",
    description: "Protein ke saath healthy fats bhi provide karta hai."
  },
  {
    id: 4,
    name: "Paneer",
    quantity: "100g",
    calories: 265,
    protein: 18,
    carbs: 6,
    fat: 20,
    category: "High Protein & High Kcal",
    description: "Protein aur calories dono relatively high hote hain."
  },
  {
    id: 5,
    name: "Sattu",
    quantity: "100g",
    calories: 380,
    protein: 22,
    carbs: 58,
    fat: 6,
    category: "High Protein & Carbs",
    description: "Roasted chana se bana sattu protein aur carbs dono deta hai."
  },
  {
    id: 6,
    name: "Roasted Chana",
    quantity: "100g",
    calories: 360,
    protein: 20,
    carbs: 60,
    fat: 5,
    category: "High Protein & Carbs",
    description: "Affordable protein aur complex carbs ka source."
  },
  {
    id: 7,
    name: "Oats",
    quantity: "100g",
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fat: 6.9,
    category: "High Carbs & Kcal",
    description: "Energy aur complex carbohydrates ke liye useful."
  },
  {
    id: 8,
    name: "Cooked Rice",
    quantity: "100g",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    category: "High Carbs",
    description: "Easy-to-digest carbohydrate source."
  },
  {
    id: 9,
    name: "Cooked Dal",
    quantity: "100g",
    calories: 115,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    category: "Protein & Carbs",
    description: "Plant protein aur carbohydrates ka good combination."
  },
  {
    id: 10,
    name: "Peanuts",
    quantity: "100g",
    calories: 567,
    protein: 26,
    carbs: 16,
    fat: 49,
    category: "High Kcal",
    description: "Bahut calorie-dense food, protein aur healthy fats rich."
  },
  {
    id: 11,
    name: "Almonds",
    quantity: "100g",
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    category: "High Kcal",
    description: "Healthy fats aur calories ka concentrated source."
  },
  {
    id: 12,
    name: "Milk",
    quantity: "100ml",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    category: "Protein",
    description: "Protein, calcium aur other nutrients provide karta hai."
  },
  {
    id: 13,
    name: "Curd",
    quantity: "100g",
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fat: 3.3,
    category: "Protein",
    description: "Protein aur calcium ka useful source."
  },
  {
    id: 14,
    name: "Banana",
    quantity: "100g",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    category: "High Carbs",
    description: "Carbohydrates aur quick energy ka convenient source."
  },
  {
    id: 15,
    name: "Potato",
    quantity: "100g",
    calories: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
    category: "High Carbs",
    description: "Affordable carbohydrate-rich food."
  },
  {
    id: 16,
    name: "Sweet Potato",
    quantity: "100g",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    category: "High Carbs",
    description: "Carbohydrates aur fiber ka good source."
  },
  {
    id: 17,
    name: "Wheat Flour (Atta)",
    quantity: "100g",
    calories: 340,
    protein: 13,
    carbs: 72,
    fat: 2.5,
    category: "High Carbs & Kcal",
    description: "Roti aur other wheat-based foods ke liye common staple."
  },
  {
    id: 18,
    name: "Mushroom",
    quantity: "100g",
    calories: 22,
    protein: 3.1,
    carbs: 3.3,
    fat: 0.3,
    category: "Low Kcal",
    description: "Low-calorie food jo protein bhi provide karta hai."
  },
  {
    id: 19,
    name: "Green Peas",
    quantity: "100g",
    calories: 81,
    protein: 5.4,
    carbs: 14,
    fat: 0.4,
    category: "Protein & Carbs",
    description: "Plant protein, carbs aur fiber ka source."
  },
  {
    id: 20,
    name: "Rajma",
    quantity: "100g cooked",
    calories: 127,
    protein: 8.7,
    carbs: 22.8,
    fat: 0.5,
    category: "Protein & Carbs",
    description: "Plant protein, complex carbs aur fiber rich food."
  }
];

function FoodName() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "High Protein",
    "High Carbs",
    "High Kcal",
    "Low Kcal"
  ];

  const filteredFoods = foodData.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesCategory = true;

    if (category === "High Protein") {
      matchesCategory = food.protein >= 15;
    }

    if (category === "High Carbs") {
      matchesCategory = food.carbs >= 30;
    }

    if (category === "High Kcal") {
      matchesCategory = food.calories >= 300;
    }

    if (category === "Low Kcal") {
      matchesCategory = food.calories <= 100;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="food-container">

      <h1 className="food-title">
        Food Nutrition
      </h1>

      <p className="food-subtitle">
        Check calories, protein, carbs and fat in different foods
      </p>

      {/* Search */}
      <div className="food-search-box">
        <input
          type="text"
          placeholder="🔍 Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="food-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? "filter-btn active-filter"
                : "filter-btn"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="food-grid">

        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div className="food-card" key={food.id}>

              <h2 className="food-name">
                {food.name}
              </h2>

              <p className="food-quantity">
                Nutrition per {food.quantity}
              </p>

              <span className="food-category">
                {food.category}
              </span>

              {/* Calories */}
              <div className="calorie-box">
                <span className="calorie-number">
                  {food.calories}
                </span>

                <span className="calorie-label">
                  kcal
                </span>
              </div>

              {/* Macros */}
              <div className="macro-container">

                <div className="macro-box">
                  <span className="macro-value">
                    {food.protein}g
                  </span>
                  <span className="macro-label">
                    Protein
                  </span>
                </div>

                <div className="macro-box">
                  <span className="macro-value">
                    {food.carbs}g
                  </span>
                  <span className="macro-label">
                    Carbs
                  </span>
                </div>

                <div className="macro-box">
                  <span className="macro-value">
                    {food.fat}g
                  </span>
                  <span className="macro-label">
                    Fat
                  </span>
                </div>

              </div>

              <p className="food-description">
                {food.description}
              </p>

            </div>
          ))
        ) : (
          <div className="no-food">
            <h2>Food not found 😕</h2>
            <p>Try searching another food.</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default FoodName;