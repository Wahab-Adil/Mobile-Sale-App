import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ExpenseForm from "../../components/expense/saleForm/SaleForm";
import {
  getExpense,
  AllExpenses,
  updateExpense,
  selectIsLoading,
  selectExpense,
} from "../../redux/features/expense/expenseSlice";

const ExpenseEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectExpense);

  const [expense, setExpense] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [productPrice, setProductPrice] = useState();

  useEffect(() => {
    dispatch(getExpense(id));
  }, [dispatch, id]);

  useEffect(() => {
    setExpense(productEdit);

    setImagePreview(
      productEdit && productEdit.image
        ? `http://localhost:5000/${productEdit.image}`
        : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const editExpenseFun = async (e) => {
    e.preventDefault();
    const formData = {
      to: expense?.to,
      narration: expense?.narration,
      paid: expense?.paid,
      description: description,
    };
    const res = await dispatch(updateExpense({ id, formData }));
    await dispatch(AllExpenses());
    if (res.status === "200") {
      navigate("/sale");
    }
  };
  console.log("expense", description);

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Sale</h3>
      <ExpenseForm
        product={expense}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        editExpenseFun={editExpenseFun}
      />
    </div>
  );
};

export default ExpenseEdit;
