import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import NavBar from './NavBar';
const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);

function WorkoutRoutine() {
  const user = localStorage.getItem('user');
  const imageUrl = localStorage.getItem(user + 'profileImage');

  const [exerciseName, setExerciseName] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState('');


  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleCaloriesBurnedChange = (event) => {
    setCaloriesBurned(event.target.value);
  };

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const workoutSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exerciseName, caloriesBurned, sets, reps, date }),
    });
    if (response.status === 200) {
      alert('Workout logged successfully.');
    } else {
      alert('An error occurred');
    }
  };

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch(`http://localhost:3001/api/workouts/${user}`);
      const data = await response.json();
      setWorkouts(data);
    }
    fetchWorkouts();
  }, [user]);



  return(
    <body class="bg-gray-50 min-h-screen">
    <NavBar/>

    <div class="grid grid-col-2 flex flex-row">
    <div class=" col-span-1 flex flex-row mx-auto ">
      <form class="mt-10" onSubmit={workoutSubmit}>
        <label>
          Exercise:
          <input class="inline-block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-3" type="text" value={exerciseName} onChange={handleExerciseNameChange} />
        </label>
        <br />
        <label>
          Calories burned:
          <input class="inline-block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-3" type="number" value={caloriesBurned} onChange={handleCaloriesBurnedChange} />
        </label>
        <br />
        <label>
          Sets:
          <input class="inline-block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-3" type="number" value={sets} onChange={handleSetsChange} />
        </label>
        <br />
        <label>
          Reps:
          <input class="inline-block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-3" type="number" value={reps} onChange={handleRepsChange} />
        </label>
        <br />
        <label>
          Date:
          <input class="text-black" type="date" value={date} onChange={handleDateChange} />
        </label>
        <br />
        <div class="flex justify-center">
        <button class="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 mx-auto" type="submit">Submit</button>
      </div>
      </form>
      </div>

      <div class=" col-span-1 font-extralight">
      <h2 className="text-center mt-4 text-gray-900">Logged Workouts:</h2>
      <ul class="text-center text-sm">
        {workouts.map((workout) => (
          <li key={workout._id}>
            <p class=" font-normal py-3"> Exercise Name: {workout.exerciseName}</p>
            <p class="">Calories Burned: {workout.caloriesBurned}</p>
            <p>Sets: {workout.sets}</p>
            <p>Reps: {workout.reps}</p>
            <p>Date: {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </body>
  )
};

export default WorkoutRoutine;