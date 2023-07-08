import React from 'react';
import MealItem from "../MealItem/MealItem";

interface Props {
  meals: IMealInfo[];
}

const Meals: React.FC<Props> = ({ meals }) => {
  return (
    <div className="m-auto w-75 d-flex flex-column gap-4">
      { meals.map(meal => <MealItem meal={meal} key={meal.id} />) }
    </div>
  );
};

export default Meals;