import React, { useEffect } from "react";
import { Button, Menu, Space, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { orderFindAll } from "../../../service/admins/orderApi";
import { updateOrder } from "../../../service/admins/orderApi";
import InputSearch from "./inputSearch/InputSearch";

export interface DataType {
  key: string;
  order_id: string;
  order_date: string;
  order_status: string;
  payment_method: string;
  delivery_status: string;
  email: string;
}
export interface OrderDetailType {
  product_description: string;
  order_detail_id: number;
  order_id: number;
  product_id: string;
  quantity: number;
  total_price: number;
  discounted_price: number;
  engraving_content: string;
  engraving_checked: number;
  product: {
    product_id: string;
    product_name: string;
    primary_img: string;
  };
}

// ORDER STATUS TAG
function getTagOrderStatus(order_status: string) {
  switch (order_status) {
    case "pending":
      return "#9288F8";
    case "confirmed":
      return "#279EFF";
    case "cancelled":
      return "#FF6969";
    case "Wait for confirmation":
      return "#843c54";

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

//tag delivery
// ORDER STATUS TAG
function getTagDelivery(order_status: string) {
  switch (order_status) {
    case "Confirming":
      return "#66cdaa";

    default:
      return "gray";
  }
}
function renderDelivery(order_status: string) {
  return (
    <Tag style={{ whiteSpace: "normal" }} color={getTagDelivery(order_status)}>
      {order_status}
    </Tag>
  );
}

const ListOrders: React.FC = () => {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [page, setpage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [initialData, setInitialData] = useState<DataType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total_initialPages, setTotal_initialPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<DataType | null>(null);
  const [tagValue, setTagValue] = useState<string | null>(null);

  // const [deliveryStatus, setDeliveryStatus] = useState("");
  // const [filterChanged, setFilterChanged] = useState(false);

  useEffect(() => {
    const allOrderData = async () => {
      try {
        const response = isFiltered
          ? await orderFindAll(undefined, page, tagValue!)
          : await orderFindAll(undefined, page);
        if (response.data.status === 200) {
          const updatedData = response.data.result.map((item: any) => ({
            ...item,
            key: item.order_id,
          }));
          setData(updatedData);
          if (!isFiltered) {
            setInitialData(updatedData);
            setTotal_initialPages(response.data.totalPages);
          }
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error(error);
      }
    };

    allOrderData();
    console.log("render ???");
  }, [page, isFiltered]);

  // xác nhận đơn hàng
  const handleConfirm = async (record: DataType) => {
    const order_id = record.order_id;
    const order_status = "confirmed";
    const mail = record.email;
    const payload = {
      order_status: order_status,
      mail: mail,
    };
    try {
      const response = await updateOrder(+order_id, payload);
      if (response.status === 200) {
        // Cập nhật trạng thái của đơn hàng trong mảng data
        const updatedData = data.map((item) => {
          if (item.order_id === order_id) {
            return {
              ...item,
              order_status: response.data.result,
            };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // hủy đơn hàng
  const handleCancel = async (record: DataType) => {
    const order_id = record.order_id;
    const order_status = "cancelled";
    const mail = record.email;
    const payload = {
      order_status: order_status,
      mail: mail,
    };
    try {
      const response = await updateOrder(+order_id, payload);
      if (response.status === 200) {
        // Cập nhật trạng thái của đơn hàng trong mảng data
        const updatedData = data.map((item) => {
          if (item.order_id === order_id) {
            return {
              ...item,
              order_status: response.data.result,
            };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //xác nhận gửi hàng
  const handleConfirmDelivery = async (record: DataType) => {
    const order_id = record.order_id;

    const payload = {
      deliveryStatus: "Confirming",
    };
    try {
      const response = await updateOrder(+order_id, payload);
      if (response.status === 200) {
        // Cập nhật trạng thái của đơn hàng trong mảng data
        const updatedData = data.map((item) => {
          if (item.order_id === order_id) {
            return {
              ...item,
              delivery_status: response.data.result,
            };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // wait for confirm
  const handleWaitForConfirmation = async (record: DataType) => {
    const order_id = record.order_id;
    const order_status = "Wait for confirmation";
    const mail = record.email;
    const payload = {
      order_status: order_status,
      mail: mail,
    };
    try {
      const response = await updateOrder(+order_id, payload);
      if (response.status === 200) {
        // Cập nhật trạng thái của đơn hàng trong mảng data
        const updatedData = data.map((item) => {
          if (item.order_id === order_id) {
            return {
              ...item,
              order_status: response.data.result,
            };
          }
          return item;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Search

  const handleSearch = async (value: number | string) => {
    if (!value) {
      setData(initialData);
      setTotalPages(total_initialPages);
      return;
    }
    try {
      console.log(value);

      const response = await orderFindAll(+value, undefined, undefined);
      setData(response.data.result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  // COLUMN TYPE
  const columns: ColumnsType<DataType> = [
    {
      title: "No.",
      key: "index",
      rowScope: "row",
      render: (_record, _item, index) => index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      render: (text) => {
        const localDate = new Date(text).toLocaleString(undefined, {
          hour12: false,
        });
        return <span>{localDate}</span>;
      },
    },
    {
      title: "Order Status",
      dataIndex: "order_status",
      width: 125,
      align: "center",
      render: renderOrderStatus,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      align: "center",
      render: (text) => (
        <span>{text === "cod" ? "Cash on delivery" : "Credit Card"}</span>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "delivery_status",
      width: 125,
      align: "center",
      render: renderDelivery,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* Detail button  */}
          <Button onClick={handleOpenOrderDetails(record)}>Details</Button>
          {/* Order Action Dropdown button  */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0" onClick={() => handleConfirm(record)}>
                  Confirmed
                </Menu.Item>
                <Menu.Item
                  key="1"
                  onClick={() => handleWaitForConfirmation(record)}
                >
                  Wait for confirmation
                </Menu.Item>
                <Menu.Item key="2" onClick={() => handleCancel(record)}>
                  Cancelled
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button onClick={(e) => e.preventDefault()}>
              <Space>
                Order Action
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          {/* Delivery Action Dropdown button  */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="0"
                  onClick={() => handleConfirmDelivery(record)}
                >
                  confirmed
                </Menu.Item>
                <Menu.Item key="2">transit</Menu.Item>
                <Menu.Item key="4">delivered</Menu.Item>
                <Menu.Item key="6">cancelled</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button onClick={(e) => e.preventDefault()}>
              <Space>
                Delivery Action
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // HANDLE OPEN ORDER DETAILS MODAL
  const handleOpenOrderDetails = (orderData: DataType) => () => {
    setSelectedOrder(orderData);
    setOpenDetailModal(true);
  };

  // HANDLE CLOSE ORDER DETAILS MODAL
  const handleCloseDetailsModal = () => {
    setOpenDetailModal(false);
  };
  const handlePageChange = (page: number) => {
    setpage(page);
  };

  // filter tag
  const handleTagClick = async (tagValue: string) => {
    setIsFiltered(true);
    setTagValue(tagValue);
    setpage(1);
    try {
      const response = await orderFindAll(undefined, page, tagValue);
      if (response.data.status === 200) {
        const updatedData = response.data.result.map((item: any) => ({
          ...item,
          key: item.order_id,
        }));
        setData(updatedData);
        setInitialData(updatedData);
        setTotalPages(response.data.totalPages);
        setTotal_initialPages(response.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Space.Compact block>
          <InputSearch handleSearch={handleSearch} />
        </Space.Compact>
        <br />
        <Space style={{ marginBottom: "1em" }}>
          Filter Order Status by :
          <Tooltip>
            <Tag
              onClick={() => handleTagClick("pending")}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                cursor: "pointer",
                opacity: hoveredTag === "Pending" ? 0.7 : 1,
              }}
              color="#9288F8"
            >
              Pending
            </Tag>
          </Tooltip>
          <Tooltip>
            <Tag
              onClick={() => handleTagClick("confirmed")}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                cursor: "pointer",
                opacity: hoveredTag === "Confirmed" ? 0.7 : 1,
              }}
              color="#279EFF"
            >
              Confirmed
            </Tag>
          </Tooltip>
          <Tooltip>
            <Tag
              onClick={() => handleTagClick("Wait for confirmation")}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                cursor: "pointer",
                opacity: hoveredTag === "Wait for confirmation" ? 0.7 : 1,
              }}
              color="#843c54"
            >
              Wait for confirmation
            </Tag>
          </Tooltip>
          <Tooltip>
            <Tag
              onClick={() => handleTagClick("cancelled")}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                cursor: "pointer",
                opacity: hoveredTag === "Cancelled" ? 0.7 : 1,
              }}
              color="#FF6969"
            >
              Cancelled
            </Tag>
          </Tooltip>
        </Space>
        <br />
        <Space>
          Filter Delivery Status by :
          <Tooltip>
            <Tag
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                cursor: "pointer",
                opacity: hoveredTag === "Confirming" ? 0.7 : 1,
              }}
              color="#66cdaa"
            >
              Confirming
            </Tag>
          </Tooltip>
          <Tooltip>
            <Tag
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                cursor: "pointer",
                opacity: hoveredTag === "None" ? 0.7 : 1,
              }}
              color="gray"
            >
              None
            </Tag>
          </Tooltip>
        </Space>
        <br />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{
          current: page,
          total: totalPages,
          pageSize: 8,
          onChange: handlePageChange,
        }}
      />
      {openDetailModal && (
        <OrderDetailsModal
          handleCloseDetailsModal={handleCloseDetailsModal}
          orderData={selectedOrder}
        />
      )}
    </>
  );
};

export default ListOrders;
