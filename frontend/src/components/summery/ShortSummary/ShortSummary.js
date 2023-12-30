import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCashCoin, BsCashStack } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const BsChartRight = <BsCashCoin size={40} color="#fff" />;
const BsChartCoins = <BsCashStack size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ShortSummery = ({ products, PurchaseStoreValue }) => {
  return (
    <div>
      <h3 className="--mt">Full Summery</h3>
      <div
        className="info-summary"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div>
          <label
            style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}
          >
            Product Summery
          </label>
          <br />
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Total Store Quantity
          </label>
          <InfoBox
            icon={productIcon}
            count={products?.productSummery?.storeQuantity}
            bgColor="card1"
          />
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Total Store Value
          </label>
          <InfoBox
            icon={earningIcon}
            count={PurchaseStoreValue}
            bgColor="card1"
          />
        </div>

        <div>
          <label
            style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}
          >
            Sale Summery
          </label>
          <br />
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Total Sold Quantity
          </label>
          <InfoBox
            icon={productIcon}
            count={products?.saleSummery?.soldQuantity}
            bgColor="card4"
          />
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Total Sold Value
          </label>
          <InfoBox
            icon={earningIcon}
            count={products?.saleSummery?.storeValue}
            bgColor="card4"
          />
        </div>

        <div>
          <label
            style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}
          >
            Loan Summery
          </label>
          <br />
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Loan Total Paid
          </label>
          <div
            className={`info-box`}
            style={{ width: "400px", backgroundColor: "#1fb2aa" }}
          >
            <span className="info-icon --color-white">{BsChartRight}</span>
            <span className="info-text">
              <p style={{ fontWeight: "bold" }}>
                {products?.loanSummery?.totalPaid}
              </p>
            </span>
          </div>
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Loan Total Recived
          </label>
          <InfoBox
            icon={BsChartCoins}
            count={products?.loanSummery?.totalRecived}
            bgColor="card2"
          />
        </div>

        <div>
          <label
            style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}
          >
            Expense Summery
          </label>
          <br />
          <label
            style={{ fontSize: "1rem", fontWeight: "bold", color: "black" }}
          >
            Expense Total Paid
          </label>
          <InfoBox
            icon={categoryIcon}
            count={products?.expenseSummery?.totalPaid}
            bgColor="card3"
          />
        </div>
      </div>
    </div>
  );
};

export default ShortSummery;
