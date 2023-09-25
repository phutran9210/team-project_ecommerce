// ConfirmationModal.tsx

import React from "react";
import { Modal, Typography } from "antd";

type UserRole = "Admin" | "Manager";

interface AdminFormState {
  confirm?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  user_name?: string;
}

interface ConfirmationModalProps {
  visible: boolean;
  data: AdminFormState;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  data,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title="Confirm Registration"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
    >
      <Typography.Text>
        <strong>Username:</strong> {data.user_name}
      </Typography.Text>
      <br />
      <Typography.Text>
        <strong>Email:</strong> {data.email}
      </Typography.Text>
      <br />
      <Typography.Text>
        <strong>Role:</strong> {data.role}
      </Typography.Text>
    </Modal>
  );
};

export default ConfirmationModal;
