import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/saleStackTrash/productList/ProductList";
import ProductSummary from "../../components/saleStackTrash/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { SaleStackTrashList } from "../../redux/features/saleStackTrash/saleStackTrashSlice";

const SaleStackTrash = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { saletrashList, isLoading, isError, message } = useSelector(
    (state) => state.saleTrash
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(SaleStackTrashList());
    }

    if (isError) {
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={saletrashList} />
      <ProductList products={saletrashList} isLoading={isLoading} />
    </div>
  );
};

export default SaleStackTrash;
