import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Space,
  Tooltip,
  Row,
  Col,
  Radio,
  RadioChangeEvent,
  Modal,
  message,
} from "antd";
import VoucherList from "./VoucherList";
import { createVoucher } from "../../../../service/admins/adminApi";
import { customAlphabet } from "nanoid";
import SelectApply from "./selectApply/SelectApply";
import SelectProduct from "./selectProduct/SelectProduct";
import { renderVoucherRequest } from "../../../../store/slices/voucherSlice/voucher-slice";
import { useDispatch } from "react-redux";

const { RangePicker } = DatePicker;
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export type DiscountForm = {
  code_discount: string;
  discount_description: string;
  discount_amount: number;
  use_limit: number;
  discount_scope: string;
  start_date?: number;
  end_date?: number;
  duration?: string[];
  selectedProductValues: string[];
  selectedProductCategory: string[];
};

const Voucher: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  //state chọn độ dài của code
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [codeLength, setCodeLength] = useState<number>(10);
  //state thay đổi Apply for
  const [selectedScope, setSelectedScope] = useState<string>("order");
  //state prop changeProduct
  const [selectedProductValues, setSelectedProductValues] = useState<string[]>(
    []
  );
  const [selectedProductCategory, setSelectedProductCategory] = useState<
    string[]
  >([]);

  //tạo độ dài voucher
  const handleScopeChange = (e: RadioChangeEvent) => {
    setSelectedScope(e.target.value);
  };

  const handleCodeLengthChange = (value: any) => {
    if (typeof value === "number") {
      setCodeLength(value);
    }
  };
  //tạo voucher
  const handleRandomVoucher = () => {
    if (codeLength < 1) {
      message.error("Length of code must be > 0");
      return;
    }
    const generateId = customAlphabet(alphabet, codeLength);
    const newCode = generateId();
    setVoucherCode(newCode);
    form.setFieldsValue({ code_discount: newCode });
  };

  //prop selectProduct
  const selectProduct = (values: string[]) => {
    setSelectedProductValues(values);
  };
  //prop selectCategory
  const selectCategory = (values: string[]) => {
    setSelectedProductCategory(values);
  };

  const onFinish = async (values: Partial<DiscountForm>) => {
    let dataToSend = values;

    // chuyển đổi timestamp
    if (values.duration && values.duration.length >= 2) {
      dataToSend.start_date = new Date(values.duration[0]).getTime();
      dataToSend.end_date = new Date(values.duration[1]).getTime();
    }
    delete dataToSend.duration;

    //lọc để validate phía server
    if (
      selectedProductCategory.length === 3 ||
      dataToSend.discount_scope === "order"
    ) {
      dataToSend.discount_scope = "order";
      delete dataToSend.selectedProductValues;
      delete dataToSend.selectedProductCategory;
    } else {
      if (selectedProductValues.length) {
        dataToSend.selectedProductValues = selectedProductValues;
      } else {
        delete dataToSend.selectedProductValues;
      }

      if (selectedProductCategory.length) {
        dataToSend.selectedProductCategory = selectedProductCategory;
      } else {
        delete dataToSend.selectedProductCategory;
      }
    }

    try {
      const response = await createVoucher(dataToSend);
      if (response.data.status === 201) {
        dispatch(renderVoucherRequest(response.data.data));

        form.resetFields();
        form.setFieldsValue({ code_discount: "" });
        setVoucherCode("");
        Modal.success({
          content: "Created voucher Successfully!",
          okText: "OK",
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  //reset form
  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue({ code_discount: "" });
    setVoucherCode("");
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={12}>
        <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{ maxWidth: 650, margin: "2rem 0" }}
          form={form}
          onFinish={onFinish}
        >
          {/* VOUCHER  */}
          <Form.Item label="Voucher">
            <Space.Compact>
              <Form.Item
                initialValue={voucherCode}
                noStyle
                name="code_discount"
              >
                <Input style={{ width: "20em" }} placeholder="uEhy1bh" />
              </Form.Item>

              <Form.Item
                noStyle
                name="code_length"
                rules={[
                  {
                    type: "number",
                    min: 1,
                    message: "Length must be greater than 0!",
                  },
                ]}
              >
                <Tooltip
                  color="magenta"
                  title="Length of code"
                  placement="topLeft"
                >
                  <InputNumber
                    onChange={(value) => handleCodeLengthChange(value)}
                    style={{ width: "4em" }}
                    placeholder="10"
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item noStyle>
                <Button onClick={handleRandomVoucher}>Random</Button>
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          {/* VOUCHER"S DESCRIPTION  */}
          <Form.Item label="Description" name="discount_description">
            <Input placeholder="First order" />
          </Form.Item>
          {/* VOUCHER MINIMUM AMOUNT */}
          <Form.Item
            label="Amount ($)"
            name="discount_amount"
            rules={[
              { required: true, message: "Please input the amount!" },
              {
                type: "number",
                min: 1,
                message: "Amount must be greater than 0!",
              },
            ]}
          >
            <InputNumber placeholder="50" />
          </Form.Item>
          {/* START & END DATE  */}
          <Form.Item label="Duration" name="duration">
            <RangePicker />
          </Form.Item>
          {/* USAGING TIMES */}
          <Form.Item
            label="Using's times"
            name="use_limit"
            rules={[
              {
                type: "number",
                min: 1,
                message: "Amount must be greater than 0!",
              },
            ]}
          >
            <InputNumber placeholder="2" />
          </Form.Item>
          {/* PRODUCT APPLIED  */}
          <Form.Item
            label="Apply for"
            name="discount_scope"
            rules={[{ required: true }]}
          >
            <Radio.Group
              // defaultValue="order"
              buttonStyle="solid"
              onChange={handleScopeChange}
            >
              <Radio.Button value="order">Order</Radio.Button>
              <Radio.Button value="product">Product</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {selectedScope === "product" && (
            <>
              <Form.Item label="Choose all" name="selectApply">
                <SelectApply handleSelectCategory={selectCategory} />
              </Form.Item>
              {selectedProductCategory.length !== 3 && (
                <Form.Item label="add Select" name="selectProduct">
                  <SelectProduct handleSelectProduct={selectProduct} />
                </Form.Item>
              )}
            </>
          )}
          <Button htmlType="submit" type="primary">
            CREATE VOUCHER
          </Button>{" "}
          &nbsp;
          <Button onClick={handleReset} danger type="dashed">
            RESET FORM
          </Button>
        </Form>
      </Col>
      <Col span={12}>
        <VoucherList />
      </Col>
    </Row>
  );
};

export default () => <Voucher />;
