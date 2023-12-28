import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../../components/report/maxsold/productList/ProductList";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { maximumSoldProductsReport } from "../../../redux/features/report/reportSlice";
import Card from "../../../components/card/Card";

const MaxSold = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { maxSoldProduct, isLoading, isError, message } = useSelector(
    (state) => state.report
  );

  const initialState = {
    fromDate: "",
    toDate: "",
  };
  const [report, setReport] = useState(initialState);

  const { fromDate, toDate, limit } = report;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const getReportAvalStack = async (e) => {
    e.preventDefault();
    const data = {
      fromDate,
      toDate,
      limit: Number(limit),
    };
    if (isLoggedIn === true) {
      await dispatch(maximumSoldProductsReport(data));
    }
  };
  console.log("New", maxSoldProduct);
  return (
    <div>
      <div className="add-product">
        <Card cardClass={"card"}>
          <form onSubmit={getReportAvalStack} encType="multipart/form-data">
            <label>From Date:</label>
            <input
              type="date"
              placeholder="From Date"
              name="fromDate"
              value={report?.fromDate}
              onChange={handleInputChange}
            />

            <label>To Date:</label>
            <input
              type="date"
              placeholder="To Date"
              name="toDate"
              value={report?.toDate}
              onChange={handleInputChange}
            />
            <label>Limit:</label>
            <input
              type="number"
              placeholder="Limit Count Of of Products To Show"
              name="limit"
              value={report?.limit}
              onChange={handleInputChange}
            />
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Product
              </button>
            </div>
          </form>
        </Card>
      </div>
      <hr />
      {maxSoldProduct && (
        <ProductList
          products={maxSoldProduct ? maxSoldProduct : []}
          isLoading={isLoading}
          data={report}
        />
      )}
    </div>
  );
};

export default MaxSold;
