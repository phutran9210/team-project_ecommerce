import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { adminCategoriesAnalyst } from "../../../../service/admins/adminApi";

const CategoriesChart: React.FC = () => {
  const [dataAnalyst, setDataAnalyst] = useState<number[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await adminCategoriesAnalyst();
        if (response.data.status === 200) {
          setDataAnalyst(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const data: any = [
    {
      values: dataAnalyst,
      labels: ["Earphones", "Headphones", "Accessories"],
      type: "pie",
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true,
      showlegend: true,
    },
  ];

  const layout = {
    height: 400,
    width: 500,
    title: "Product Analyst",
  };

  return <Plot data={data} layout={layout} />;
};

export default CategoriesChart;
