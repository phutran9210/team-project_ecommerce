import React, { useState } from "react";
import { Checkbox } from "antd";

import type { CheckboxValueType } from "antd/es/checkbox/Group";
interface SelectCategoryProps {
  handleSelectCategory: (values: string[]) => void;
}

const plainOptions = ["earphones", "headphones", "accessories"];
const options = plainOptions.map((option) => ({
  label: option,
  value: option,
}));

const SelectApply: React.FC<SelectCategoryProps> = ({
  handleSelectCategory,
}) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    handleSelectCategory(list as string[]);
  };

  return (
    <Checkbox.Group
      options={options}
      value={checkedList}
      onChange={onChange}
      style={{ width: "30em" }}
    ></Checkbox.Group>
  );
};

export default SelectApply;
