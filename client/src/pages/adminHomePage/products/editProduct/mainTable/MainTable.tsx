import { Table, Image, Dropdown, Space, Tag } from "antd";
import {
  DownOutlined,
  DeleteOutlined,
  RadiusSettingOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductRequest } from "../../../../../store/slices/productSlice/editProduct-slice";
import { dataProductsByPage } from "../../../../../store/selectors/productSelector";
import { sendProductIdRequest } from "../../../../../store/slices/productSlice/editProduct-slice";
import "./mainTable.css";

export interface DataType {
  key: React.Key;
  product_name: string;
  product_description: string;
  price: string;
  onSale: number;
  sale_start: Date;
  sale_end: Date;
  quantity: number;
  primary_img: string;
  disable_status: number;
  engraving: number;
  product_type: string;
}

function getTagOrderStatus(order_status: string) {
  switch (order_status) {
    case "feature":
      return "#9288F8";
    case "trending":
      return "#279EFF";
    case "new":
      return "#FF6969";

    default:
      return "gray";
  }
}

function renderOrderStatus(order_status: string) {
  return (
    <Tag
      style={{ whiteSpace: "normal" }}
      color={getTagOrderStatus(order_status)}
    >
      {order_status}
    </Tag>
  );
}

const MainTable: React.FC<any> = ({ dataSearch }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const dataTable: any = useSelector(dataProductsByPage);
  console.log(dataSearch);

  const data = dataTable.result;
  const totalPages = dataTable.totalPages;
  const sourceData = dataSearch.length > 0 ? dataSearch : data;
  useEffect(() => {
    const payload = {
      page: page,
    };
    dispatch(getProductRequest(payload));
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleEditProduct = (record: any) => {
    dispatch(sendProductIdRequest(record.product_id));
  };

  const getItems = (record: DataType) => [
    {
      label: <p style={{ color: "#36cfc9" }}>Edit</p>,
      icon: <RadiusSettingOutlined />,
      onClick: () => handleEditProduct(record),
      key: "0",
    },
    {
      label: <p>Remove</p>,
      key: "1",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Product name",
      width: 180,
      dataIndex: "product_name",
      key: "product_name",
      fixed: "left",
      render: (text: string) => (
        <span style={{ color: "#5680E9", fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "Quantity",
      width: 100,
      dataIndex: "quantity",
      key: "quantity",
      fixed: "left",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: any) => {
        const parsedPrice = Number(price);

        if (isNaN(parsedPrice)) {
          return <span>{price}</span>;
        }

        const isWholeNumber = parsedPrice % 1 === 0;
        return (
          <span>{isWholeNumber ? parsedPrice : parsedPrice.toFixed(2)}</span>
        );
      },
    },

    {
      title: "Primary Image",
      dataIndex: "primary_img",
      key: "primary_img",
      render: (src: string) => <Image width={40} src={src} />,
    },
    {
      title: "Cover Image",
      dataIndex: "coverImages",
      key: "coverImages",
      render: (coverImages: Array<{ image_url: string }>) => {
        if (coverImages && coverImages.length > 0) {
          return <Image width={40} src={coverImages[0].image_url} />;
        }
        return null;
      },
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images: Array<{ image_url: string }>) => {
        if (images && images.length > 0) {
          const imageURLs = images.map((img) => img.image_url);

          return (
            <Image.PreviewGroup items={imageURLs}>
              {" "}
              <Image width={40} src={imageURLs[0]} />{" "}
            </Image.PreviewGroup>
          );
        }
        return null;
      },
    },

    {
      title: "Engraving",
      dataIndex: "engraving",
      key: "engraving",
      render: (value: number) => (value ? <p>Yes</p> : <p>No</p>),
    },
    {
      title: "Product type",
      dataIndex: "product_type",
      key: "product_type",
      render: renderOrderStatus,
    },
    { title: "Sale", dataIndex: "onSale", key: "onSale" },
    {
      title: "Sale start",
      dataIndex: "sale_start",
      key: "sale_start",
      render: (text) => {
        if (!text) return null;
        const localDate = new Date(text).toLocaleString(undefined, {
          hour12: false,
        });
        return <span>{localDate}</span>;
      },
    },
    {
      title: "Sale end",
      dataIndex: "sale_end",
      key: "sale_end",
      render: (text) => {
        if (!text) return null;
        const localDate = new Date(text).toLocaleString(undefined, {
          hour12: false,
        });
        return <span>{localDate}</span>;
      },
    },
    {
      title: "Operator",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_text, record) => (
        <Dropdown menu={{ items: getItems(record) }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p style={{ color: "#391085", fontWeight: "550" }}>Actions</p>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sourceData}
      scroll={{ x: 1300 }}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>
            <p style={{ color: "#8860D0", fontWeight: "bold" }}>
              Description :{" "}
            </p>
            {record.product_description}
          </p>
        ),
      }}
      pagination={{
        current: page,
        total: totalPages,
        pageSize: 8,
        onChange: handlePageChange,
      }}
    />
  );
};

export default MainTable;
