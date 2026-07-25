import { useEffect, useState } from "react";
import "./Exercise.css";

function Exercise() {

  const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 }
];

  const [month, setMonth] = useState("July");
  const [date, setDate] = useState(1);

  const [target, setTarget] = useState(500);

  const [exerciseName, setExerciseName] = useState("");
  const [time, setTime] = useState("");

  const [exerciseList, setExerciseList] = useState([]);
const exerciseOptions = [
  "Running",
  "Walking",
  "Cycling",
  "Jumping",
  "Skipping",
  "Swimming",
  "Push Ups",
  "Squats",
  "Yoga",
  "Weight Training"
];

  
  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("exerciseData")) || {};

    const key = `${month}-${date}`;

    if(saved[key]){
      setTarget(saved[key].target);
      setExerciseList(saved[key].exercises);
    }
    else{
      setTarget(500);
      setExerciseList([]);
    }

  }, [month,date]);



  
  useEffect(()=>{

    const saved =
    JSON.parse(localStorage.getItem("exerciseData")) || {};

    const key = `${month}-${date}`;

    saved[key]={
      target:target,
      exercises:exerciseList
    };

    localStorage.setItem(
      "exerciseData",
      JSON.stringify(saved)
    );


  },[target,exerciseList,month,date]);




  
  const calculateKcal=(name,time)=>{

    let kcalRate=0;

    if(name.toLowerCase()=="running"){
      kcalRate=10;
    }
    else if(name.toLowerCase()=="jumping"){
      kcalRate=8;
    }
    else if(name.toLowerCase()=="cycling"){
      kcalRate=7;
    }
    else{
      kcalRate=5;
    }

    return Number(time)*kcalRate;

  };



  const addExercise=()=>{

    if(
      exerciseName=="" ||
      time==""
    ){
      alert("Exercise aur time dale");
      return;
    }


    const kcal =
    calculateKcal(
      exerciseName,
      time
    );


    const newExercise={
      name:exerciseName,
      time:Number(time),
      kcal:kcal
    };


    setExerciseList([
      ...exerciseList,
      newExercise
    ]);


    setExerciseName("");
    setTime("");

  };

const deleteExercise = (index) => {
  const updatedList = exerciseList.filter((_, i) => i !== index);
  setExerciseList(updatedList);
};

  const totalBurn =
  exerciseList.reduce(
    (sum,item)=>sum+item.kcal,
    0
  );



return(

<div className="exercise-page">


<h1>Exercise Tracker</h1>


<div className="month-box">

<select
value={month}
onChange={(e)=>setMonth(e.target.value)}
>

{
months.map((m)=>(

<option key={m.name}>
{m.name}
</option>

))
}

</select>


<div className="dates">

{
months
.find(m=>m.name===month)
.daysArray?.map(()=>null)
}


{
Array.from(
{
length:
months.find(m=>m.name===month).days
},
(_,i)=>(

<button
key={i}
onClick={()=>setDate(i+1)}
className={
date===i+1?"active":""
}
>

{i+1}

</button>

))
}

</div>

</div>




<h2>
{month} {date}
</h2>



<div className="target-box">

<h3>Daily Target</h3>

<input
type="number"
value={target}
onChange={
(e)=>setTarget(Number(e.target.value))
}
/>

<span> kcal</span>

</div>




<div className="add-box">


<h3>Add Exercise</h3>

<select
value={exerciseName}
onChange={(e)=>setExerciseName(e.target.value)}
>

<option value="">
Select Exercise
</option>


{
exerciseOptions.map((exercise)=>(
<option 
key={exercise}
value={exercise}
>
{exercise}
</option>
))
}


</select>

<input
type="number"
placeholder="Time (min)"
value={time}
onChange={
(e)=>setTime(e.target.value)
}
/>


<button onClick={addExercise}>
Add
</button>


</div>





<div className="list">


<h3>Today's Exercise</h3>


{
exerciseList.map((item,index)=>(


<div className="exercise-card" key={index}>

  <div>
    <h4>{item.name}</h4>
    <p>⏱ {item.time} min</p>
    <p>🔥 {item.kcal} kcal</p>
  </div>

  <button
    className="delete-btn"
    onClick={() => deleteExercise(index)}
  >
    ❌ Delete
  </button>

</div>

))
}


</div>





<div className="result">

<h2>
Total Burn : {totalBurn} / {target} kcal
</h2>


{
totalBurn > target && (

<h3 className="extra">

🔥 {totalBurn - target} kcal Extra Burn

</h3>

)
}


{
totalBurn < target && (

<h3 className="remaining">

{target - totalBurn} kcal Remaining

</h3>

)
}


{
totalBurn === target && (

<h3>

🎯 Target Completed

</h3>

)
}


</div>


</div>





);


}


export default Exercise;