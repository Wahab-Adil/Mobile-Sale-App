import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/saleStack/productList/ProductList";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { AllSales } from "../../redux/features/sale/saleSlice";

const SaleStack = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { sales, isLoading, isError, message } = useSelector(
    (state) => state.sale
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(AllSales());
    }

    if (isError) {
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductList products={sales} isLoading={isLoading} />
    </div>
  );
};

export default SaleStack;
