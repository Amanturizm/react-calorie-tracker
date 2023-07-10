import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from '../../axiosApi';
import MealFormItem from "../MealFormItem/MealFormItem";
import CloseBtn from "../CloseBtn/CloseBtn";

const defaultState: IMealInfo = {
  mealtime: '',
  meal: '',
  kcal: ''
};

const PageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mealValue, setMealValue] = useState<IMealInfo>(defaultState);
  const [btnLoad, setBtnLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axiosApi<IMealInfo>(`/meals/${id}.json`);

      setMealValue(data ? data : defaultState);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void fetchData(id);
    }
  }, [fetchData, id]);

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
        setBtnLoad(true);
        if (id) {
          await axiosApi.put(`/meals/${id}.json`, mealValue);
        } else {
          await axiosApi.post('/meals.json', mealValue);
          navigate('/meals');
        }

      } catch (e) {
        console.error(e);
      } finally {
        setBtnLoad(false);
      }
    }
  };

  const form: React.ReactNode = (
    <MealFormItem
      mealValue={mealValue}
      changeValue={changeValue}
      sendData={sendData}
      btnLoad={btnLoad}
      id={id}
    />
  );

  const preloader = loading ? (
    <div className="preloader">
      <div className="loader"></div>
    </div>
  ) : null;

  return id ?
    <div className="w-25 bg-black rounded-4 py-5 px-4 pb-4 position-fixed top-50 start-50 translate-middle">
      <CloseBtn to="/meals" />
      {form}
      {preloader}
    </div>
    : <div className="w-50 m-auto">{form}</div>;
};

export default PageForm;