import React, { useState } from 'react';
import MealItem from "../MealItem/MealItem";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";

interface Props {
  meals: IMealInfo[];
  updateData: () => void;
}

const Meals: React.FC<Props> = ({ meals, updateData }) => {
  const [isDeleteConfirm, setIsDeleteConfirm] = useState<string | null>(null);

  return (
    <div className="m-auto w-75 d-flex flex-column gap-4">
      {
        meals.map(meal => (
          <MealItem meal={meal} key={meal.id} deleteConfirm={() => setIsDeleteConfirm(meal.id!)} />
        ))
      }
      {
        isDeleteConfirm ?
          <DeleteConfirm
            id={isDeleteConfirm}
            hideConfirm={() => setIsDeleteConfirm(null)}
            updateData={updateData}
          />
          : null
      }
    </div>
  );
};

export default Meals;