import React from "react";
import { Input } from "antd";
import debounce from "lodash/debounce";

interface InputSearchProps {
  handleSearch: (value: number | string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ handleSearch }) => {
  const debouncedOnChange = debounce((value: string) => {
    handleSearch(value);
  }, 500);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedOnChange(value);
  };
  return (
    <Input
      onChange={onChange}
      placeholder=".....search"
      size="large"
      style={{ width: 304 }}
    />
  );
};

export default InputSearch;
