import React from 'react';

interface Props {
  meal: IMealInfo;
}

const MealItem: React.FC<Props> = ({ meal }) => {
  return (
    <div className="d-flex justify-content-between border border-2 border-white rounded-4 p-3">
      <div>
        <h4 className="text-info">{meal.mealtime}</h4>
        <h2>{ meal.meal }</h2>
      </div>

      <div className="d-flex align-items-center gap-5">
        <h4>{meal.kcal} kcal</h4>

        <div className="d-flex flex-column gap-3">
          <button className="btn btn-outline-success">edit</button>
          <button className="btn btn-outline-danger">del</button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;