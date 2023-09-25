import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Dropdown,
  Table,
  Menu,
  Select,
  message,
} from "antd";
import type { FormInstance } from "antd/es/form";
import { DownOutlined } from "@ant-design/icons";
import { getUsers, editUsers } from "../../../../service/admins/adminApi";
import { Change } from "../modal/ConfirmChangeModal";
import ConfirmChangeModal from "../modal/ConfirmChangeModal";
import EditPasswordModal from "./editPassword/EditPasswordModal";

const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  user_id: string;
  name: string;
  email: string;
  user_status: string;

  role?: string;
}

interface EditableRowProps {
  index: number;
}

interface Changes {
  old: any;
  new?: any;
}

//kiểm tra thuộc tính thay đổi
const getChangedValues = (
  original: { [key: string]: any },
  updated: { [key: string]: any }
) => {
  const changes: { [key: string]: { old: any; new: any } } = {};

  for (const key in original) {
    if (original[key] !== updated[key] && updated[key] !== undefined) {
      changes[key] = {
        old: original[key],
        new: updated[key],
      };
    }
  }

  return changes;
};

const extractNewValues = (
  changeValue: Record<string, Changes>
): Record<string, any> => {
  return Object.keys(changeValue).reduce(
    (acc: Record<string, any>, key: string) => {
      if (changeValue[key].new !== undefined) {
        acc[key] = changeValue[key].new;
      }
      return acc;
    },
    {}
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
  children: React.ReactNode;
  setChanges: React.Dispatch<React.SetStateAction<Record<string, Change>>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRecord: React.Dispatch<React.SetStateAction<Item>>;
  setCurrentChangeValue: React.Dispatch<
    React.SetStateAction<Record<string, Change>>
  >;
  setCurrentToggleEdit: (toggleFunction: () => void) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  dataIndex,
  record,
  handleSave,
  setChanges,
  setIsModalVisible,
  setCurrentRecord,
  setCurrentChangeValue,
  setCurrentToggleEdit,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);

  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form!.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  // gọi api và lưu giá trị phía client
  const save = async () => {
    try {
      const values = await form!.validateFields();

      // Kiểm tra xem có giá trị nào thay đổi không
      const getChanged = getChangedValues(record, values);
      if (Object.keys(getChanged).length === 0) {
        toggleEdit();
        handleSave({ ...record, ...values });
        return;
      }

      const changeValue = extractNewValues(getChanged);

      setCurrentRecord(record);
      setCurrentChangeValue(changeValue);
      setCurrentToggleEdit(toggleEdit);
      setChanges(getChanged);
      setIsModalVisible(true);
    } catch (errInfo) {
      console.error(errInfo);
    }
  };

  if (!editable) {
    return <td {...restProps}>{restProps.children}</td>;
  }

  return (
    <>
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            {dataIndex === "role" || dataIndex === "user_status" ? (
              <Select ref={inputRef} onBlur={save}>
                {dataIndex === "role" ? (
                  <>
                    <Option value="Admin">Admin</Option>
                    <Option value="Manager">Manager</Option>
                  </>
                ) : (
                  <>
                    <Option value="active">Active</Option>
                    <Option value="deactive">Deactive</Option>
                  </>
                )}
              </Select>
            ) : (
              <Input ref={inputRef} onBlur={save} onPressEnter={save} />
            )}
          </Form.Item>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {restProps.children}
          </div>
        )}
      </td>
    </>
  );
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  user_id: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const UserTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [changes, setChanges] = useState<Record<string, Change>>({});
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [currentChangeValue, setCurrentChangeValue] = useState<Record<
    string,
    any
  > | null>(null);
  const [currentToggleEdit, setCurrentToggleEdit] = useState<
    (() => void) | null
  >(null);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  //Xác nhận modal
  const handleOk = async () => {
    if (currentRecord && currentChangeValue) {
      const editUserId = currentRecord.user_id;
      const response = await editUsers(editUserId, currentChangeValue);
      if (response.data.status === 200) {
        message.success("Change Success");
        if (currentToggleEdit) {
          currentToggleEdit();
        }
        handleSave({ ...currentRecord, ...currentChangeValue });
      }
    }
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
    setCurrentChangeValue(null);
  };

  //Modal chỉnh sửa password
  const handleEditPassword = (record: DataType) => {
    setSelectedUser(record);
    setIsPasswordModalVisible(true);
  };

  const handlePasswordConfirm = async (newPassword: string) => {
    // Call API to update password for selectedUser
    // For demonstration purposes, I'm just logging the new password
    if (!selectedUser) {
      console.error("No user selected!");
      return;
    }
    const payload = {
      user_password: newPassword,
    };
    const editUserId = selectedUser.user_id;
    try {
      const response = await editUsers(editUserId, payload);
      console.log(response.data);

      message.success("Password updated successfully!");
      setIsPasswordModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
  };

  useEffect(() => {
    const getDataUsers = async () => {
      try {
        const response = await getUsers();
        setDataSource(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDataUsers();
  }, []);

  // Menu dropdown action
  const getActionMenu = (record: DataType) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditPassword(record)}>
        Edit password
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDeactivate(record)}>
        Deactivate
      </Menu.Item>
    </Menu>
  );

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    render?: (text: string, record: DataType, index: number) => React.ReactNode;
  })[] = [
    {
      title: "Name",
      dataIndex: "username",
      width: "30%",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "user_status",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_text, record: any, _index: number) => (
        <>
          <Dropdown overlay={getActionMenu(record)} trigger={["click"]}>
            <Button type="link">
              Action <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];
  /**
   * Function action
   */
  // Chỉnh sửa thông tin toàn bộ

  const handleDeactivate = (record: any) => {
    console.log(record);

    console.log("Delete");
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.user_id === item.user_id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        setChanges,
        setIsModalVisible,
        setCurrentChangeValue,
        setCurrentRecord,
        setCurrentToggleEdit,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={{
          current: 1,
          pageSize: 8,
        }}
      />
      <ConfirmChangeModal
        isVisible={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        changes={changes}
      />
      <EditPasswordModal
        isVisible={isPasswordModalVisible}
        onCancel={handlePasswordCancel}
        onConfirm={handlePasswordConfirm}
      />
    </div>
  );
};

export default UserTable;
