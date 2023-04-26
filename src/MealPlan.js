import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import NavBar from './NavBar';
const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);

function MealPlan() {

  const user = localStorage.getItem('user');
  const imageUrl = localStorage.getItem(user + 'profileImage');

  const daysOfWeek = ['Month 0', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6',];
    const mealOptions = {
        breakfast: ['Oatmeal', 'Scrambled Eggs', 'Pancakes', 'Smoothie'],
        lunch: ['Chicken Salad', 'Tuna Sandwich', 'Veggie Wrap', 'Soup'],
        dinner: ['Grilled Salmon', 'Pasta with Meat Sauce', 'Stir Fry', 'Roast Chicken']
    };
    
    const [mealPlan, setMealPlan] = useState({});

    const handleMealSelect = (day, mealType, meal) => {
        setMealPlan(prevMealPlan => {
            const newMealPlan = { ...prevMealPlan };
                if (!newMealPlan[day]) {
                    newMealPlan[day] = {};
                }
            newMealPlan[day][mealType] = meal;
        return newMealPlan;
        });
    };

    // const dates = [1, 2, 3, 4, 5, 6, 7];
      
    const handleSelect = (event, day, mealType) => {
        const meal = event.target.value;
        handleMealSelect(day, mealType, meal);
    };
      
    console.log(mealPlan); 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/api/mealplan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({mealPlan})
        });
        if (response.status === 200) {
            alert('Meal plan created successfully.');
        }
        else {
            alert('An error occurred');
        }
    }

  const [mealPlanFetch, setMealPlanFetch] = useState([]);

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch(`http://localhost:3001/api/mealplan/${user}`);
      const data = await response.json();
      setMealPlanFetch(data);
    }
    fetchWorkouts();
  }, [user]);

  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const startIndex = (page - 1) * 7;
  const endIndex = startIndex + 7;

  
    return (
      <body class="bg-gray-50 min-h-screen">
      <NavBar/>
      <div class="grid-flow-row content-center mt-12 ml-11">
      <div class="inline-block">
        <form onSubmit={handleSubmit} className="inline-block">
        <div class="text-black ml-3 -space-y-1">
            <div className="meal-form">
                {daysOfWeek.map((day, index) => (
                    <div className="day" class="space-x-3 text-sm" key={index}>
                        <h3 class="mx-5">{day}</h3>

                        <select id={`breakfast-${index}`} class=" inline-block mt-1 block p-2 mb-6 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" onChange={event => handleSelect(event, index, 'breakfast')}>
                        <option value="">Breakfast</option>
                        {mealOptions.breakfast.map((meal, index) => (
                        <option value={meal} key={index}>{meal}</option>
                        ))}
                        </select>

                        <select id={`lunch-${index}`} class=" inline-block block p-2 mb-6 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" onChange={event => handleSelect(event, index, 'lunch')}>
                        <option value="">Lunch</option>
                        {mealOptions.lunch.map((meal, index) => (
                        <option value={meal} key={index}>{meal}</option>
                        ))}
                        </select>

                        <select id={`dinner-${index}`} class=" inline-block block p-2 mb-6 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" onChange={event => handleSelect(event, index, 'dinner')}>
                        <option value="">Dinner</option>
                        {mealOptions.dinner.map((meal, index) => (
                        <option value={meal} key={index}>{meal}</option>
                        ))}
                        </select>
                    </div>
                ))}
            </div>
            <div class="flex justify-center">
            <button class="inline-block font-light text-lg float-none "type="submit"> Let's try it</button>
            </div>
    </div>
    </form>
    </div>


<div class="inline-block  ml-24 -top-52 relative overflow-x-auto shadow-md sm:rounded-lg">
<table class="text-sm text-center text-gray-500 ">
  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th class="px-16 py-3">Date</th>
      <th class="px-16 py-3">Breakfast</th>
      <th class="px-16 py-3">Lunch</th>
      <th class=" px-16 py-3">Dinner</th>
    </tr>
  </thead>
  <tbody>
    {mealPlanFetch.map((mealPlan) => (
      <tr class="bg-white border-b hover:bg-gray-50 font-light" key={mealPlan._id}>
        <td>{new Date(mealPlan.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
        <td>{mealPlan.breakfast}</td>
        <td>{mealPlan.lunch}</td>
        <td>{mealPlan.dinner}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>

</div>

</body>
);
}

  
  export default MealPlan;