import React from "react";
import { Modal, Form, Input } from "antd";
import {
  regexPassword,
  tooltipRules,
  formMessages,
} from "../../../createUser/AdminForm";

interface EditPasswordProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (newPassword: string) => void;
}

const EditPasswordModal: React.FC<EditPasswordProps> = ({
  isVisible,
  onCancel,
  onConfirm,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm(values.password);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  function validatePassword(_rule: any, value: string, callback: any) {
    if (!value) {
      callback(formMessages.passwordRequired);
    } else if (!regexPassword.test(value)) {
      callback(formMessages.passwordNotValid);
    } else {
      callback();
    }
  }

  return (
    <Modal
      title="Edit Password"
      open={isVisible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          tooltip={tooltipRules.passwordTooltip}
          name="password"
          label="New Password"
          rules={[
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPasswordModal;
