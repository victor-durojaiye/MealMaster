

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Welcome from "./Welcome";
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import CalorieTracker from './CalorieTracker';
import MealPlan from './MealPlan';
import WorkoutRoutine from './WorkoutRoutine';
import Feed from './Feed';
import ProfilePicture from './ProfilePicture';

function RoutesDefined() {
 return(
  <div>
      <Routes>
          <Route path = "/" element={<Welcome/>} />
          <Route path = "/login" element={<Login/>} />
          <Route path = "/register" element={<Register/>} />
          <Route path = "/homepage" element={<HomePage/>} />
          <Route path = "/calories" element={<CalorieTracker/>} />
          <Route path = "/meals" element={<MealPlan/>} />
          <Route path = "/feed" element={<Feed/>} />
          <Route path = "/exercise" element={<WorkoutRoutine/>} />
          <Route path = "/profilepicture" element={<ProfilePicture/>} />

      </Routes>
  </div>
  );
}



export default RoutesDefined;
