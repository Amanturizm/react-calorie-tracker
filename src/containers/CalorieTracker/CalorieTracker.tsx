import React, {useCallback, useEffect, useState} from 'react';
import Meals from "../../components/Meals/Meals";
import axiosApi from "../../axiosApi";

const CalorieTracker = () => {
  const [meals, setMeals] = useState<IMealInfo[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axiosApi.get<IApiMealInfo>('/meals.json');

      const formattedData = data ? Object.keys(data).map(id => ({ ...data[id], id })) : [];

      setMeals(formattedData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => void fetchData(), [fetchData]);

  return (
    <div className="mt-4">
      <Meals meals={meals} />
    </div>
  );
};

export default CalorieTracker;