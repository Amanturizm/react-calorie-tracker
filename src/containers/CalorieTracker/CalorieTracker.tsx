import React, {useCallback, useEffect, useState} from 'react';
import Meals from "../../components/Meals/Meals";
import axiosApi from "../../axiosApi";
import {Link} from "react-router-dom";

const CalorieTracker = () => {
  const [meals, setMeals] = useState<IMealInfo[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosApi.get<IApiMealInfo>('/meals.json');

      const formattedData = data ? Object.keys(data).map(id => ({ ...data[id], kcal: +data[id].kcal, id })) : [];

      setTotalCalories(formattedData.reduce((acc, meal) => acc + meal.kcal, 0));
      setMeals(formattedData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => void fetchData(), [fetchData]);

  return (
    <div className="d-flex flex-column gap-4 mt-4">
      <div className="d-flex justify-content-between align-items-center w-75 mx-auto">
        <h5>Total calories: {totalCalories} kcal</h5>
        <Link to="new-meal" className="btn btn-primary">Add new meal</Link>
      </div>

      <Meals meals={meals} />
    </div>
  );
};

export default CalorieTracker;