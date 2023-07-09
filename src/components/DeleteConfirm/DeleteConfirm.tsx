import React, {useState} from 'react';
import axiosApi from "../../axiosApi";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import {useNavigate} from "react-router-dom";

interface Props {
  id: string;
  hideConfirm: () => void;
}

const DeleteConfirm: React.FC<Props> = ({ id, hideConfirm }) => {
  const [btnLoad, setBtnLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteMeal = async () => {
    try {
      setBtnLoad(true);
      await axiosApi.delete(`/meals/${id}.json`);
    } catch (e) {
      console.error(e);
    } finally {
      hideConfirm();
      navigate('/');
    }
  };

  return (
    <div className="position-fixed top-50 start-50 translate-middle bg-black rounded-4 p-4">
      Are you sure you want to delete this entry?
      <div className="d-flex justify-content-end gap-3 mt-4">
        <button className="btn btn-danger" disabled={btnLoad} onClick={deleteMeal}>
          { btnLoad ? <ButtonSpinner /> : 'Yes' }
        </button>
        <button className="btn btn-success" onClick={hideConfirm}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirm;