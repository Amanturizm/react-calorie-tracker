import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosApi from '../../axiosApi';
import { MEALTIMES } from "../../constants";

const defaultState: IMealInfo = {
  mealtime: '',
  meal: '',
  kcal: ''
};

const PageForm = () => {
  const navigate = useNavigate();

  const [mealValue, setMealValue] = useState<IMealInfo>(defaultState);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setMealValue(prevState => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mealValue.meal.length < 1) {
      alert('Введите описание!');
    } else if (!mealValue.kcal) {
      alert('Введите калории!');
    } else {
      try {
        await axiosApi.post('/meals.json', mealValue);

        navigate('/meals');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form onSubmit={sendData} style={{ minWidth: 300 }} className="container w-50 p-4">
      <label htmlFor="select-mealtime" className="form-label">Mealtime</label>
      <select
        className="form-select mb-2"
        id="select-mealtime"
        name="mealtime"
        onChange={changeValue}
      >
        <option value="" hidden>Select mealtime</option>
        {
          MEALTIMES.map(mealtime => (
            <option
              key={'mealtime' + mealtime}
              className="text-black"
              value={mealtime}
            >
              {mealtime}
            </option>
          ))
        }
      </select>

      <label htmlFor="textarea-meal" className="form-label">Meal description</label>
      <textarea
        name="meal"
        id="textarea-meal"
        cols={2}
        rows={3}
        className="form-control"
        value={mealValue.meal}
        onChange={changeValue}
      />

      <label htmlFor="input-kcal" className="form-label">Kcal</label>
      <input
        name="kcal"
        id="input-kcal"
        type="number"
        className="form-control"
        value={mealValue.kcal}
        onChange={changeValue}
      />

      <button className="btn btn-outline-primary mt-3 px-4">Create</button>
    </form>
  );
};

export default PageForm;