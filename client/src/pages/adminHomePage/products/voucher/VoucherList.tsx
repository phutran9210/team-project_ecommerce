import React, { useEffect } from "react";
import { Button, Table, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector, useDispatch } from "react-redux";
import { voucherDataSelector } from "../../../../store/selectors/voucherSelector";
import {
  getVoucherRequest,
  removeVoucherRequest,
} from "../../../../store/slices/voucherSlice/voucher-slice";

interface DataType {
  key: string;
  code_discount: string;
  discount_description: string;
  discount_amount: number;
  end_date: string;
  use_limit: number;
}

const VoucherList: React.FC = () => {
  const dispatch = useDispatch();
  const data: any = useSelector(voucherDataSelector);

  useEffect(() => {
    dispatch(getVoucherRequest());
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Voucher",
      dataIndex: "code_discount",
      key: "code_discount",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Des",
      dataIndex: "discount_description",
      key: "discount_description",
    },
    {
      title: "Amount",
      dataIndex: "discount_amount",
      key: "discount_amount",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Start ",
      dataIndex: "end_date",
      key: "start_date",
      render: (text) => {
        if (!text) return null;
        const localDate = new Date(text).toLocaleString(undefined, {
          hour12: false,
        });
        return <span>{localDate}</span>;
      },
    },
    {
      title: "End ",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => {
        if (!text) return null;
        const localDate = new Date(text).toLocaleString(undefined, {
          hour12: false,
        });
        return <span>{localDate}</span>;
      },
    },
    {
      title: "Times",
      dataIndex: "use_limit",
      key: "use_limit",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Popconfirm
          title="Delete the voucher"
          description="Are you sure to delete this voucher?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record.discount_code_id)}
        >
          <Button danger>
            <i className="fa-regular fa-trash-can" />
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const handleDelete = (value: string) => {
    const payload = {
      discount_code_id: +value,
    };
    dispatch(removeVoucherRequest(payload));
  };

  return <Table columns={columns} dataSource={data} />;
};
export default VoucherList;
