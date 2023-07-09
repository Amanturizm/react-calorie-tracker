import React, {useState} from 'react';
import {MEALTIMES} from "../../constants";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

interface Props {
  mealValue: IMealInfo;
  changeValue: React.ChangeEventHandler;
  sendData: React.FormEventHandler;
  btnLoad: boolean;
  id?: string;
}

const MealFormItem: React.FC<Props> = ({ mealValue, changeValue, sendData, btnLoad, id }) => (
  <form onSubmit={sendData} style={{minWidth: 300}} className="container">
    <label htmlFor="select-mealtime" className="form-label">Mealtime</label>
    <select
      className="form-select mb-2"
      id="select-mealtime"
      name="mealtime"
      value={mealValue.mealtime}
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

    <label htmlFor="input-kcal" className="form-label mt-2">Kcal</label>
    <input
      name="kcal"
      id="input-kcal"
      type="number"
      className="form-control"
      value={mealValue.kcal}
      onChange={changeValue}
    />

    <button className="btn btn-outline-primary mt-3 px-4" disabled={btnLoad}>
      { btnLoad ? <ButtonSpinner /> : id ? ' Edit' : 'Create' }
    </button>
  </form>
);

export default MealFormItem;