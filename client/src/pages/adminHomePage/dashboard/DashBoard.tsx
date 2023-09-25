import React from "react";
import CategoriesChart from "./categoriesChart/CategoriesChart";
import OrderChart from "./orderChart/OrderChart";
import { Row, Col } from "antd";

const PieChart: React.FC = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <CategoriesChart />
        </Col>
        <Col span={12}>
          <OrderChart />
        </Col>
      </Row>
    </>
  );
};

export default PieChart;
