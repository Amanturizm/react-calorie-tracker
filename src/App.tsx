import React from 'react';
import {Link, Route, Routes, useLocation} from "react-router-dom";
import CalorieTracker from "./containers/CalorieTracker/CalorieTracker";
import MealForm from "./components/MealForm/MealForm";
import NotFound from "./containers/NotFound/NotFound";

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
          <Route path={pathname === '/' ? '/' : '/meals'} element={<CalorieTracker/>}>
            <Route path="/meals/edit-meal/:id" element={<MealForm />} />
          </Route>
          <Route path={setSeveralPossiblePaths('/new-meal', '/meals/new-meal')} element={<MealForm/>} />

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
