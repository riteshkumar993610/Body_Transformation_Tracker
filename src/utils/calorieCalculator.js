export const calculateTarget = (goal) => {

  if(goal === "Fat Loss"){
    return {
      calories:2000,
      protein:80,
      carbs:200,
      fat:80
    }
  }


  if(goal === "Maintain Weight"){
    return {
      calories:2500,
      protein:100,
      carbs:300,
      fat:90
    }
  }


  if(goal === "Muscle Gain"){
    return {
      calories:2800,
      protein:130,
      carbs:350,
      fat:100
    }
  }

}