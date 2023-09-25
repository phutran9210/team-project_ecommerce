import React, { useState } from "react";
import InputSearch from "../../orders/inputSearch/InputSearch";
import MainTable from "./mainTable/MainTable";
import { Space } from "antd";
import { adminSearchProduct } from "../../../../service/admins/adminApi";

const EditProduct: React.FC = () => {
  const [dataSearch, setDataSearch] = useState<any>([]);
  const handleSearch = async (value: number | string) => {
    if (!value) {
      setDataSearch([]);
      return;
    }
    const payload = {
      payload: value,
    };
    try {
      const response = await adminSearchProduct(payload);

      setDataSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Space.Compact block>
        <InputSearch handleSearch={handleSearch} />
      </Space.Compact>
      <br />
      <MainTable dataSearch={dataSearch} />
    </div>
  );
};
export default EditProduct;
