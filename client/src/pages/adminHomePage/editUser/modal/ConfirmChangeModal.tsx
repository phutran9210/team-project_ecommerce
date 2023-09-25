// ConfirmChangeModal.tsx
import React from "react";
import { Modal } from "antd";

export interface Change {
  old: string | number;
  new: string | number;
}

interface Props {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  changes: Record<string, Change>;
}

const ConfirmChangeModal: React.FC<Props> = ({
  isVisible,
  onConfirm,
  onCancel,
  changes,
}) => {
  return (
    <Modal
      title="Xác nhận thay đổi"
      open={isVisible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <ul>
        {Object.entries(changes)
          .filter(([, change]) => change.new)
          .map(([key, change]) => (
            <li key={key}>
              {key}: {change.old} {"==>"} {change.new}
            </li>
          ))}
      </ul>
    </Modal>
  );
};

export default ConfirmChangeModal;
