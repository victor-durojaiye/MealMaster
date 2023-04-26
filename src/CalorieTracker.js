import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Avatar from '@mui/material/Avatar';
const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);

function CalorieTracker(){
  const [goal, setGoal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');

  const user = localStorage.getItem('user');
  const imageUrl = localStorage.getItem(user + 'profileImage');

  let [totalCalories, setTotalCalories] = useState('');
  let [totalProtein, setTotalProtein] = useState('');
  let [totalCarbs, setTotalCarbs] = useState('');

  const handleCaloriesChange = (event) => {
    setCalories(event.target.value);
  };

  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  };

  const handleCarbsChange = (event) => {
    setCarbs(event.target.value);
  };

  const handleGoalSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/newgoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: goal }),
      });
      if (response.status === 200 ) {
     //   setGoal(goal);
        alert("You have successfully set a calorie goal!")
      }  
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
  async function fetchCalorieGoal() {
  fetch('/api/calorieGoals')
  .then(response => response.json())
  .then(data => {
    const goal = data.goal;
    console.log(goal);
    setGoal(goal);
  })
  .catch(error => {
    console.error(error);
  })}
  fetchCalorieGoal();
  }, []);

  const caloriesSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/calories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ calories }),
    })
    if (response.status === 200) {
        alert('Calories tracked successfully.');
    }
    else {
        alert('An error occurred');
      }
  };

  const proteinSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/protein', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ protein }),
    })
    if (response.status === 200) {
        alert('Protein tracked successfully.');
    }
    else {
        alert('An error occurred');
      }
  };

  const carbsSubmit = async (event) => {
    const response = await fetch('http://localhost:3001/api/carbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ carbs: carbs }),
    })
    if (response.status === 200) {
        alert('Carbs tracked successfully.');
    }
    else {
        alert('An error occurred');
      }
  };


  useEffect(() => {
    const fetchTotalCalories = async () => {
      const response = await fetch(`http://localhost:3001/api/calories/${user}`);
      const calCount = await response.json();
      setTotalCalories(calCount);
    };  
    fetchTotalCalories();
  }, [user]);


  useEffect(() => {
    const fetchTotalProtein = async () => {
      const response = await fetch(`http://localhost:3001/api/protein/${user}`);
      const proteinCount = await response.json();
      setTotalProtein(proteinCount);
    };  
    fetchTotalProtein();
  }, [user]);


  useEffect(() => {
    const fetchTotalCarbs = async () => {
      const response = await fetch(`http://localhost:3001/api/carbs/${user}`);
      const carbCount = await response.json();
      setTotalCarbs(carbCount);
    };  
    fetchTotalCarbs();
  }, [user]);


  

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };
  
  return(
    <body class="bg-gray-50 min-h-screen">
    <NavBar/>
    <div class="">
      <div class="flex flex-justify justify-center">
    <form onSubmit={handleGoalSubmit}>
        <input class="block py-2.5 px-0 text-center text-sm text-gray-900 w-96 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " type="number" value={goal} onChange={handleGoalChange} />
      <button type="submit" class="text-gray-900 bg-primary-600 text-center hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-28 py-2.5 ">Daily Calorie/Macro Goal</button>
    </form>
    </div>
    <form class="mt-10" onSubmit={caloriesSubmit}>
    <div class="relative z-0 w-4/6 flex flex-wrap items-center justify-between mx-auto mb-6 group">
      <input type="number" value={calories} onChange={handleCaloriesChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label class="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Today's calories and macros for today: </label>
    </div>
    <button type="submit" class="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update CM</button>
    </form>

    {totalCalories !== null ? <p class="text-4xl text-gray-900 text-center font-extralight mt-10">Today: {totalCalories} / {goal}</p> : <p>You have not tracked any calories or macros yet</p>}
    
    
    </div>
    </body>  
        )  
    };
    
    export default CalorieTracker;