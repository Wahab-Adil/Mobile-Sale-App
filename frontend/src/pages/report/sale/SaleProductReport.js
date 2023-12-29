import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../../components/report/saleStack/productList/ProductList";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { DateWiseSaleReport } from "../../../redux/features/report/reportSlice";
import Card from "../../../components/card/Card";

const MinSoldReport = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { salesReport, isLoading, isError, message } = useSelector(
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
      await dispatch(DateWiseSaleReport(data));
    }
  };
  console.log("min", salesReport);
  return (
    <div>
      <div
        className="add-product"
        style={{ minwidth: "100%", display: "flex", justifyContent: "center" }}
      >
        <Card cardClass={"card"}>
          <form onSubmit={getReportAvalStack} encType="multipart/form-data">
            <label style={{ fontWeight: "bold" }}>From Date:</label>
            <input
              style={{ minWidth: "100%", fontWeight: "bold", fontSize: "3rem" }}
              type="date"
              placeholder="From Date"
              name="fromDate"
              value={report?.fromDate}
              onChange={handleInputChange}
            />

            <label style={{ fontWeight: "bold" }}>To Date:</label>
            <input
              style={{ minWidth: "100%", fontWeight: "bold", fontSize: "3rem" }}
              type="date"
              placeholder="To Date"
              name="toDate"
              value={report?.toDate}
              onChange={handleInputChange}
            />
            <div className="--my">
              <button
                style={{ fontWeight: "bold", width: "100%" }}
                type="submit"
                className="--btn --btn-primary"
              >
                Find
              </button>
            </div>
          </form>
        </Card>
      </div>
      <hr />
      {salesReport && (
        <ProductList
          products={salesReport.sales ? salesReport.sales : []}
          isLoading={isLoading}
          data={report}
        />
      )}
    </div>
  );
};

export default MinSoldReport;
