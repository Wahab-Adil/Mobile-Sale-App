import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSummery from "../../components/summery/ShortSummary/ShortSummary";
import Chart2 from "./chart";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { SummeryReport } from "../../redux/features/report/reportSlice";
import Card from "../../components/card/Card";
import {
  CALC_STORE_VALUE,
  getProducts,
} from "../../redux/features/product/productSlice";
import { selectTotalStoreValue } from "../../redux/features/product/productSlice";

const Summery = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const PurchaseStoreValue = useSelector(selectTotalStoreValue);
  const { summeryResult, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const initialState = {
    fromDate: "",
    toDate: "",
  };
  const [summeryCred, setSummeryCred] = useState(initialState);

  const { fromDate, toDate } = summeryCred;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSummeryCred({ ...summeryCred, [name]: value });
  };

  const getSummeryReport = async (e) => {
    e.preventDefault();
    const data = {
      fromDate,
      toDate,
    };
    console.log("pro", new Date().toLocaleDateString());
    console.log("pro", fromDate);

    if (isLoggedIn === true) {
      await dispatch(SummeryReport(data));
      const { payload } = await dispatch(getProducts());
      console.log("Products", payload);
      await dispatch(CALC_STORE_VALUE(payload));
    }
  };

  const data = {
    labels: ["Expense", "Sale", "Purchase", "Loan-Recieved", "Loan-Paid"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          summeryResult?.expenseSummery?.totalPaid,
          summeryResult?.saleSummery?.storeValue,
          PurchaseStoreValue,
          summeryResult?.loanSummery?.totalRecived,
          summeryResult?.loanSummery?.totalPaid,
        ],
        backgroundColor: [
          "rgb(150, 3, 3)",
          "rgb(54,162,235)",
          "rgb(158, 0, 145)",
          "rgb(41, 168, 71)",
          "rgb(31, 178, 170)",
        ],
        hoverOffser: 4,
      },
    ],
  };
  return (
    <div>
      <div
        className="add-product"
        style={{ minwidth: "100%", display: "flex", justifyContent: "center" }}
      >
        <Card cardClass={"card"}>
          <form onSubmit={getSummeryReport} encType="multipart/form-data">
            <label style={{ fontWeight: "bold" }}>From Date:</label>
            <input
              style={{ minWidth: "100%", fontWeight: "bold", fontSize: "3rem" }}
              type="date"
              placeholder="From Date"
              name="fromDate"
              value={summeryCred?.fromDate}
              onChange={handleInputChange}
            />

            <label style={{ fontWeight: "bold" }}>To Date:</label>
            <input
              style={{ minWidth: "100%", fontWeight: "bold", fontSize: "3rem" }}
              type="date"
              placeholder="To Date"
              name="toDate"
              value={summeryCred?.toDate}
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

      <ProductSummery
        products={summeryResult}
        PurchaseStoreValue={PurchaseStoreValue}
      />
      <hr
        style={{
          height: "1rem",
          backgroundColor: "lightblue",
          marginBottom: "1rem",
        }}
      />
      <Chart2 data={data} />
    </div>
  );
};

export default Summery;
