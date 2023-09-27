import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  SettingOutlined,
  UserAddOutlined,
  ShopOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  BarsOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, message, theme } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminForm from "./createUser/AdminForm";
import UserSearch from "./editUser/UserSearch";
import AddProductMain from "./products/addProduct/AddProductMain";
import Voucher from "./products/voucher/Voucher";
import axios from "axios";
import ListOrders from "./orders/ListOrders";
import EditProduct from "./products/editProduct/EditProduct";
import { ROUTER_PATH } from "../../constants";
import PieChart from "./dashboard/DashBoard";
import { productIdToHomeSelector } from "../../store/selectors/productSelector";
import FormEdit from "./products/editProduct/mainTable/formEdit/FormEdit";
import ActivityLogTable from "./website/logger/ActivityLogTable ";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Create User", "3", <UserAddOutlined />),
    getItem("Edit User", "4", <EditOutlined />),
  ]),
  getItem("Product", "sub2", <ShopOutlined />, [
    getItem("Add product", "6", <AppstoreAddOutlined />),
    getItem("Edit product", "8", <EditOutlined />),
    getItem("Voucher", "9", <GiftOutlined />),
  ]),
  getItem("Order", "10", <ShoppingCartOutlined />, [
    getItem("List Orders", "11", <BarsOutlined />),
  ]),
  getItem("Website", "15", <SettingOutlined />, [
    getItem("Logger", "16", <NodeIndexOutlined />),
  ]),
];

const AdminHome: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isChangingDueToEditProductId, setIsChangingDueToEditProductId] =
    useState(false);
  const editProductId = useSelector(productIdToHomeSelector);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!editProductId || isEmptyObject(editProductId)) {
      const selectedValue = new URLSearchParams(location.search).get(
        "selected"
      );
      setSelectedKey(selectedValue || "sub1");
      return;
    }
    navigate(`/admin/home?selected=edit-product&product-id=${editProductId}`);
    setSelectedKey("edit-product");
  }, [editProductId]);

  useEffect(() => {
    if (isChangingDueToEditProductId) {
      setIsChangingDueToEditProductId(false);
      return;
    }

    const initialSelectedKey =
      new URLSearchParams(location.search).get("selected") || "sub1";
    setSelectedKey(initialSelectedKey);
  }, [location]);

  // Lấy giá trị selectedKey từ URL parameters
  const initialSelectedKey =
    new URLSearchParams(location.search).get("selected") || "sub1";
  const [selectedKey, setSelectedKey] = useState(initialSelectedKey);

  const renderComponent = () => {
    switch (selectedKey) {
      case "3":
        return <AdminForm />;
      case "4":
        return <UserSearch />;
      case "6":
        return <AddProductMain />;
      case "8":
        return <EditProduct />;
      case "9":
        return <Voucher />;
      case "11":
        return <ListOrders />;
      case "edit-product":
        return <FormEdit />;
      case "16":
        return <ActivityLogTable />;

      default:
        return <PieChart />;
    }
  };
  const handleMenuSelect = ({ key }: { key: string }) => {
    console.log("Menu item selected:", key);
    setSelectedKey(key);
    navigate(`/admin/home?selected=${key}`);
  };

  const handleLogoutClick = async () => {
    await axios
      .post(
        `http://localhost:3008/api/v1/admins/logout`,
        {},
        { withCredentials: true }
      )
      .then((respone) => {
        if (respone.data === 200) {
          navigate(ROUTER_PATH.ADMIN);
          window.location.reload();
          return message.success("Admin logged out successfully!");
        }
      })
      .catch((error: any) => {
        message.error("Error logging out admin!");
        console.error(error);
      });
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="show-scroll">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={handleMenuSelect}
          selectedKeys={[selectedKey]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center mx-[2.5rem] text-center py-2">
            <Link to={ROUTER_PATH.ADMIN_HOME}>
              <img
                className="w-[20rem]"
                src="/logos/black-logo.png"
                alt="logo"
              />
            </Link>
            <Button type="dashed" danger onClick={handleLogoutClick}>
              LOG OUT
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 530,
              background: colorBgContainer,
            }}
          >
            {renderComponent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
