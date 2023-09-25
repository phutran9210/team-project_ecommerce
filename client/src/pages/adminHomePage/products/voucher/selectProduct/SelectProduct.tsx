import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { voucherFindProduct } from "../../../../../service/admins/adminApi";

const options: SelectProps["options"] = [];

interface ProductVoucher {
  product_id: string;
  product_name: string;
}

interface SelectProductProps {
  handleSelectProduct: (values: string[]) => void;
}

const SelectProduct: React.FC<SelectProductProps> = ({
  handleSelectProduct,
}) => {
  const [data, setData] = useState(options);
  const [valueInput, setValueInput] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const response = await voucherFindProduct(valueInput);

      const formattedResults = response.data.map((item: ProductVoucher) => ({
        value: item.product_id,
        label: item.product_name,
      }));
      const result = [...data, ...formattedResults];

      const uniqueProducts = result.reduce((acc, current) => {
        if (!acc.find((product: any) => product.value === current.value)) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setData(uniqueProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = (value: string) => {
    setValueInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelectChange = (selectedValues: string[]) => {
    // Lọc ra những giá trị không có trong danh sách options
    const validValues = selectedValues.filter((value) =>
      data.some((option) => option.value === value)
    );

    // Cập nhật lại giá trị của Select
    setSelectedValues(validValues);
    //Lọc lại data
    setData((prevData) =>
      prevData.filter((product) =>
        validValues.includes(product.value as string)
      )
    );
    //callback prop
    handleSelectProduct(validValues);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      onSearch={onSearch}
      onInputKeyDown={handleKeyDown}
      options={data}
      onChange={handleSelectChange}
      value={selectedValues}
    />
  );
};

export default SelectProduct;
