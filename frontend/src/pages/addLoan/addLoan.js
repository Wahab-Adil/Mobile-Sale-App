import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/loan/productForm/ProductForm";
import {
  createLoan,
  selectIsLoading,
} from "../../redux/features/loan/loanSlice";

const initialState = {
  to: "",
  narration: "",
  paid: "",
  recieved: "",
  description: "",
  date: null,
};

const AddLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(initialState);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { to, narration, paid, recieved, date } = loan;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      to,
      narration,
      paid,
      recieved,
      description,
      date,
    };

    await dispatch(createLoan(data));

    // navigate("/avaliable");
  };
  console.log("loan", loan);

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Loan</h3>
      <ProductForm
        product={loan}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddLoan;
