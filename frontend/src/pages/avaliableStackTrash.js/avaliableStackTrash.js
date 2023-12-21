import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/avaliableStackTrash/productList/ProductList";
import ProductSummary from "../../components/avaliableStackTrash/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { AvaliableStackTrashList } from "../../redux/features/avaliableStackTrash/avaliableStackTrashSlice";

const AvaliableStackTrash = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { trashList, isLoading, isError, message } = useSelector(
    (state) => state.avaliableStkTrash
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(AvaliableStackTrashList());
    }

    if (isError) {
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={trashList} />
      <ProductList products={trashList} isLoading={isLoading} />
    </div>
  );
};

export default AvaliableStackTrash;
