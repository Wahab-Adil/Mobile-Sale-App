import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement);

const Chart2 = ({ data }) => {
  let MyChart;

  MyChart = <Doughnut data={data}></Doughnut>;

  return (
    <>
      <div style={{ width: "400px", height: "400px", margin: "auto" }}>
        {MyChart}
      </div>
    </>
  );
};

export default Chart2;
