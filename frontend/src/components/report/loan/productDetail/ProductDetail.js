import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getLoan } from "../../../redux/features/loan/loanSlice";
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
  const { loan, isLoading, isError, message } = useSelector(
    (state) => state.loan
  );

  console.log('loan', loan)
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getLoan(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="product-details--mt">Loan Details Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {loan && (
          <div className="detail">
            <div className="product-details-box">
              <h4>
                <b>Date: </b>
                {moment(loan?.date).format("MMMM Do YYYY")}
              </h4>
            </div>
            <h4>
              &rarr;{" "}
              <b>
                <span>To </span>
              </b>{" "}
              :&nbsp; {loan?.to}
            </h4>
            <h4>
              <b>&rarr; narration : </b> {loan?.narration}
            </h4>
            <h4>
              <b>&rarr; Paid Price : </b> &#1547;
              {loan?.paid}
            </h4>{" "}
            <h4>
              <b>&rarr; Recived Price : </b> &#1547;
              {loan?.paid}
            </h4>
            <h4>
              <b>&rarr; Details : </b> &#1547;
              <div
                className="product-details-info"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(loan?.description),
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
