import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/expense/productForm/ProductForm";
import {
  createExpense,
  selectIsLoading,
} from "../../redux/features/expense/expenseSlice";
import moment from "moment";

const initialState = {
  to: "",
  narration: "",
  paid: "",
  description: "",
  date: null,
};

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(initialState);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { to, narration, paid, date } = expense;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      to,
      narration,
      paid,
      description,
      date,
    };

    await dispatch(createExpense(data));

    // navigate("/avaliable");
  };
  console.log("product", expense);

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={expense}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddExpense;
