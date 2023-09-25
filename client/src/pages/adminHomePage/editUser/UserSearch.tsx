import React, { useState } from "react";
import { Input, Button } from "antd";
import UserTable from "./usersTable/UserTable";

const { Search } = Input;

const UserSearch: React.FC = () => {
  const [value, setValue] = useState("");
  console.log(value);

  const handleSearch = (value: string) => {
    setValue(value);
  };
  return (
    <div>
      <Search
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 16,
          marginBottom: 16,
          maxWidth: "20em",
        }}
        placeholder="input username"
        enterButton="Search"
        size="middle"
        onSearch={handleSearch}
      />
      <UserTable />
    </div>
  );
};

export default UserSearch;
