import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/expense/productList/ProductList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { AllExpenses } from "../../redux/features/expense/expenseSlice";

const Expense = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { expenses, isLoading, isError, message } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(AllExpenses());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductList products={expenses} isLoading={isLoading} />
    </div>
  );
};

export default Expense;
