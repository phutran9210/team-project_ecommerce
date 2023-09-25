import React, { useState } from "react";
import { Form, Input, Button, Select, notification, Modal } from "antd";
import ConfirmationModal from "./modal/ConfirmationModal";
import "./adminForm.css";
import { createUsers } from "../../../service/admins/adminApi";

const { Option } = Select;

export type UserRole = "Admin" | "Manager";

export interface AdminFormState {
  confirm?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  username?: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const formMessages = {
  usernameRequired: "Please input your username!",
  usernameNotValid: "Username is not valid",
  passwordRequired: "Please input your password!",
  passwordNotValid: "Password is not valid",
  passwordConfirmRequired: "Please confirm your password!",
  passwordMismatch: "The new password that you entered do not match!",
  roleRequired: "Please select role !",
};

export const tooltipRules = {
  usernameTooltip: `Must be between 8 to 20 characters in length.\nCannot start or end with the symbols _ or ..\nMust contain at least one uppercase letter.`,
  passwordTooltip: `Must be between 8 to 20 characters in length.\nCan only include the characters a-z, A-Z, 0-9, and the symbols . and _.\nCannot have two consecutive . or _ symbols.\nCannot start or end with the symbols . or _.`,
};

//regex
export const regexPassword =
  /^(?=.{8,20}$)(?![_\.])(?=.*[A-Z])[A-Za-z0-9._]*[^_\.]$/;
const regexUsername = /^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-zA-Z]{2,6}$/;

const AdminForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<AdminFormState>({});
  /**
   * Validate username
   */

  function validateUsername(_rule: any, value: string, callback: any) {
    if (!value) {
      callback(formMessages.usernameRequired);
    } else if (!regexUsername.test(value)) {
      callback(formMessages.usernameNotValid);
    } else {
      callback();
    }
  }
  /**
   * Validate password
   */

  function validatePassword(_rule: any, value: string, callback: any) {
    if (!value) {
      callback(formMessages.passwordRequired);
    } else if (!regexPassword.test(value)) {
      callback(formMessages.passwordNotValid);
    } else {
      callback();
    }
  }
  /**
   * validate email
   */
  function validateEmail(_rule: any, value: string, callback: any) {
    if (!value) {
      callback("Please input your email!");
    } else if (!regexEmail.test(value)) {
      callback("Email is not valid");
    } else {
      callback();
    }
  }

  /**
   * Function xử lý Confirmation Modal
   */
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmModal = async () => {
    const { confirm, ...userInfo } = formData;
    try {
      const response = await createUsers(userInfo);
      setIsModalVisible(false);
      form.resetFields();
      setFormData({});
      Modal.success({
        title: "Notification Title",
        content: `${response.data.message}`,
        okText: "Close",
        centered: true,
      });
    } catch (err: any) {
      setIsModalVisible(false);

      console.error("Error:", err);
    }
  };
  /**
   * Xử lý button
   */
  //onFinish
  const handleSubmit = (values: any) => {
    setFormData(values);
    handleOpenModal();
  };
  //resetForm
  const handleReset = () => {
    form.resetFields();
    setFormData({});
  };

  return (
    <>
      <Form
        {...formItemLayout}
        name="register"
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          tooltip={tooltipRules.usernameTooltip}
          name="user_name"
          label="Username"
          rules={[
            {
              required: true,
              validator: validateUsername,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          tooltip={tooltipRules.passwordTooltip}
          name="user_password"
          label="Password"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["user_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: formMessages.passwordRequired,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("user_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(formMessages.passwordMismatch));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, validator: validateEmail }]}
          name="email"
          label="Email"
          required
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: formMessages.roleRequired }]}
        >
          <Select<UserRole>
            placeholder="Select role"
            style={{ maxWidth: "12em" }}
          >
            <Option value="Admin">Admin</Option>
            <Option value="Manager">Manager</Option>
          </Select>
        </Form.Item>
        <div className="btn-create-admin">
          <Form.Item>
            <Button danger onClick={handleReset}>
              Reset Form
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
        </div>
      </Form>
      <ConfirmationModal
        visible={isModalVisible}
        data={formData}
        onConfirm={handleConfirmModal}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default AdminForm;
