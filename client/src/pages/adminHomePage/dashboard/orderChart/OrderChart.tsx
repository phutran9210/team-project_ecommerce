import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./orderChart.css";
import { adminOrderTransportAnalyst } from "../../../../service/admins/adminApi";

const OrderChart: React.FC = () => {
  const [dataAnalystOrder, setDataAnalystOrder] = useState<number[]>([]);
  const [dataAnalystTransport, setDataAnalystTransport] = useState<number[]>(
    []
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await adminOrderTransportAnalyst();
        if (response.data.status === 200) {
          setDataAnalystOrder(response.data.statusOrder);
          setDataAnalystTransport(response.data.statusDelevery);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  var orderTrace = {
    x: ["Order", "Order", "Order"],
    y: dataAnalystOrder,
    name: "Order",
    type: "bar",
    textinfo: "text + value",
    width: 0.5,
    text: [
      "Pending: " + dataAnalystOrder[0],
      "Confirm: " + dataAnalystOrder[1],
      "Waiting: " + dataAnalystOrder[2],
    ],
    textangle: 0,
    marker: {
      color: ["#ff652f", "#ffe400", "#14a76c"],
    },
  };

  var transportTrace = {
    x: ["Transport", "Transport"],
    y: dataAnalystTransport,
    name: "Transport",
    type: "bar",
    width: 0.5,
    text: [
      "Waiting :" + dataAnalystTransport[0],
      "Confirm :" + dataAnalystTransport[1],
    ],
    textangle: 0,
    marker: {
      color: ["#84ceeb", "#c1c8e4"],
    },
  };

  var data: any = [orderTrace, transportTrace];

  var layout: any = {
    title: "Order and Transport",
    barmode: "stack",
    height: 400,
    width: 500,
  };
  return (
    <>
      <Plot data={data} layout={layout} />
    </>
  );
};

export default OrderChart;
