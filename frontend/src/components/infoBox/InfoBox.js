import React from "react";
import "./InfoBox.scss";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`} style={{ width: "400px" }}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p style={{ fontWeight: "bold" }}>{title}</p>
        <p style={{ fontWeight: "bold" }}>{count}</p>
      </span>
    </div>
  );
};

export default InfoBox;
