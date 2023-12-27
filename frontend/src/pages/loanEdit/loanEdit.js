import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ExpenseForm from "../../components/expense/saleForm/SaleForm";
import {
  getLoan,
  getAllLoans,
  updateLoan,
  selectIsLoading,
  selectLoan,
} from "../../redux/features/loan/loanSlice";

const LoanEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const loanEdit = useSelector(selectLoan);

  const [loan, setLoan] = useState(loanEdit);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getLoan(id));
  }, [dispatch, id]);

  useEffect(() => {
    setLoan(loanEdit);

    setDescription(
      loanEdit && loanEdit.description ? loanEdit.description : ""
    );
  }, [loanEdit]);

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const editloanFun = async (e) => {
    console.log("called");
    e.preventDefault();
    const formData = {
      to: loan?.to,
      narration: loan?.narration,
      paid: loan?.paid,
      recieved: loan?.recieved,
      date: loan?.date,
      description: description,
    };
    const res = await dispatch(updateLoan({ id, formData }));
    await dispatch(getAllLoans());
    if (res.status === "200") {
      navigate("/sale");
    }
  };
  console.log("loan");

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Loan</h3>
      <ExpenseForm
        product={loan}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        editExpenseFun={editloanFun}
      />
    </div>
  );
};

export default LoanEdit;
