import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getExpense } from "../../../redux/features/expense/expenseSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import moment from "moment";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { expense, isLoading, isError, message } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getExpense(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="product-details--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {expense && (
          <div className="detail">
            <div className="product-details-box">
              <h4>
                <b>Date: </b>
                {moment(expense?.date).format("MMMM Do YYYY")}
              </h4>
            </div>
            <h4>
              &rarr;{" "}
              <b>
                <span>To </span>
              </b>{" "}
              :&nbsp; {expense?.to}
            </h4>
            <h4>
              <b>&rarr; narration : </b> {expense?.narration}
            </h4>
            <h4>
              <b>&rarr; Expense Price : </b> &#1547;
              {expense?.paid}
            </h4>
            <h4>
              <b>&rarr; Details : </b> &#1547;
              <div
                className="product-details-info"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(expense?.description),
                }}
              ></div>
            </h4>

            <hr />

            <hr />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
