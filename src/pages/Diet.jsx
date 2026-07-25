import { useState } from "react";
import FoodList from "../components/FoodList";

function Diet() {

  const [food, setFood] = useState({
    meal: "Breakfast",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const addFood = () => {

    const oldFood =
      JSON.parse(localStorage.getItem("foods")) || [];

    oldFood.push(food);

    localStorage.setItem(
      "foods",
      JSON.stringify(oldFood)
    );

    alert("Food Added Successfully ✅");

    setFood({
      meal: "Breakfast",
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });
  };

  return (
  <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">

    <h1 className="text-3xl font-bold text-center mb-6">
      🍽️ Add Food
    </h1>

    <select
      name="meal"
      value={food.meal}
      onChange={handleChange}
      className="border p-3 w-full mb-4 rounded"
    >
      <option>Breakfast</option>
      <option>Lunch</option>
      <option>Dinner</option>
      <option>Snack</option>
    </select>

    <input
      type="text"
      name="name"
      placeholder="Food Name"
      value={food.name}
      onChange={handleChange}
      className="border p-3 w-full mb-4 rounded"
    />

    <input
      type="number"
      name="calories"
      placeholder="Calories"
      value={food.calories}
      onChange={handleChange}
      className="border p-3 w-full mb-4 rounded"
    />

    <input
      type="number"
      name="protein"
      placeholder="Protein (g)"
      value={food.protein}
      onChange={handleChange}
      className="border p-3 w-full mb-4 rounded"
    />

    <input
      type="number"
      name="carbs"
      placeholder="Carbs (g)"
      value={food.carbs}
      onChange={handleChange}
      className="border p-3 w-full mb-4 rounded"
    />

    <input
      type="number"
      name="fat"
      placeholder="Fat (g)"
      value={food.fat}
      onChange={handleChange}
      className="border p-3 w-full mb-4 rounded"
    />

    <button
  onClick={addFood}
  className="bg-black text-white w-full py-3 rounded-lg"
>
  Add Food
</button>

<FoodList />

</div>
);
}

export default Diet;