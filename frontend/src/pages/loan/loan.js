import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/loan/productList/ProductList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAllLoans } from "../../redux/features/loan/loanSlice";

const Loan = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { allLoans, isLoading, isError, message } = useSelector(
    (state) => state.loan
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllLoans());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  console.log("all loans", allLoans);
  return (
    <div>
      <ProductList products={allLoans} isLoading={isLoading} />
    </div>
  );
};

export default Loan;
