import React from 'react';
import {Link, Route, Routes, useLocation} from "react-router-dom";
import CalorieTracker from "./containers/CalorieTracker/CalorieTracker";
import MealForm from "./components/MealForm/MealForm";

const App = () => {
  const { pathname } = useLocation();

  const setSeveralPossiblePaths = (...rest: string[]): string => {
    let res = '';

    rest.forEach(item => {
      if (pathname === item) res = item;
    });

    return res;
  };

  return (
    <>
      <header className="bg-black bg-opacity-50 position-fixed w-100 z-3 py-4 px-5">
        <Link className="navbar-brand text-white" to="/">Calorie tracker</Link>
      </header>

      <main style={{paddingTop: 76}}>
        <Routes>
          <Route path={setSeveralPossiblePaths('/', '/meals')} element={<CalorieTracker/>} />
          <Route path={setSeveralPossiblePaths('/new-meal', '/meals/new-meal')} element={<MealForm/>}/>

          <Route path="*" element={<h1 className="position-absolute top-50 start-50 translate-middle">Not Found!</h1>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
