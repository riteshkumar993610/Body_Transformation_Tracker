import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


function Food(){

const [searchParams] = useSearchParams();

const navigate = useNavigate();


const meal =
searchParams.get("meal") || "breakfast";


const [foodName,setFoodName] = useState("");
const [calories,setCalories] = useState("");
const [protein,setProtein] = useState("");
const [carbs,setCarbs] = useState("");
const [fat,setFat] = useState("");



const addFood = () => {


const data =
JSON.parse(localStorage.getItem("foodData")) || {};


const d = new Date();


const month =
d.toLocaleString("en-US",{month:"long"});


const key =
`${month}-${d.getDate()}`;



if(!data[key]){
data[key] = {};
}


if(!data[key][meal]){
data[key][meal] = [];
}



data[key][meal].push({

name: foodName,
calories: Number(calories),
protein: Number(protein),
carbs: Number(carbs),
fat: Number(fat)

});



localStorage.setItem(
"foodData",
JSON.stringify(data)
);



navigate("/");


};



return(

<div className="food-page">


<h1>
Add {meal} Food
</h1>


<input
placeholder="Food Name"
value={foodName}
onChange={(e)=>setFoodName(e.target.value)}
/>



<input
placeholder="Calories"
type="number"
value={calories}
onChange={(e)=>setCalories(e.target.value)}
/>



<input
placeholder="Protein"
type="number"
value={protein}
onChange={(e)=>setProtein(e.target.value)}
/>



<input
placeholder="Carbs"
type="number"
value={carbs}
onChange={(e)=>setCarbs(e.target.value)}
/>



<input
placeholder="Fat"
type="number"
value={fat}
onChange={(e)=>setFat(e.target.value)}
/>



<button onClick={addFood}>
Save Food
</button>


</div>

);


}


export default Food;