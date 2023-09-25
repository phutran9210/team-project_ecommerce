import React, { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import {
  Button,
  Form,
  InputNumber,
  Radio,
  Select,
  Upload,
  DatePicker,
  Input,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetFormAddProductSelector } from "../../../../../../store/selectors/productSelector";
import { setDefaultResetAllForm } from "../../../../../../store/slices/productSlice/product-slice";
import { ProductFormItemProps } from "../../../../../../constants/interface/propsInterface";
import {
  isBeforeToday,
  disabledHours,
  disabledSeconds,
  disabledMinutes,
} from "../../../editProduct/mainTable/formEdit/categoties";

const { Option } = Select;
const { RangePicker } = DatePicker;
const MAX_FILES = 5;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFileSingle = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  if (e?.fileList?.length > 1) {
    e.fileList = [e.fileList[0]];
  }
  return e?.fileList;
};
const normFileMulti = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const beforeUpload = (file: any, fileList: any) => {
  if (fileList.length > MAX_FILES) {
    message.error(`Bạn chỉ có thể tải lên tối đa ${MAX_FILES} ảnh.`);
    return false;
  }
  return true;
};

const ProductFormItem: React.FC<ProductFormItemProps> = ({
  sendDataToParent,
  onCategoryChange,
}) => {
  const [form] = Form.useForm();
  const [saleValue, setSaleValue] = useState<number | null>(null);
  const resetFormKey = useSelector(resetFormAddProductSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resetFormKey === false) {
      return;
    }
    form.resetFields();
    dispatch(setDefaultResetAllForm());
  }, [resetFormKey]);

  return (
    <>
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onValuesChange={(_changedValues, allValues) => {
          sendDataToParent(allValues);
          if (_changedValues.category_name && onCategoryChange) {
            onCategoryChange(_changedValues.category_name);
          }
        }}
      >
        <Form.Item
          name="category_name"
          label="Select categories"
          hasFeedback
          rules={[
            { required: true, message: "Please select your categories!" },
          ]}
        >
          <Select
            placeholder="Please select a categories"
            onChange={(value) => {
              if (onCategoryChange) {
                onCategoryChange(value as string);
              }
            }}
          >
            <Option value="headphones">HEADPHONES</Option>
            <Option value="earphones">EARPHONES</Option>
            <Option value="accessories">ACCESSORIES</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="product_type"
          label="Select Type"
          hasFeedback
          rules={[{ required: true, message: "Please select your Type!" }]}
        >
          <Select placeholder="Please select a type">
            <Option value="new">New</Option>
            <Option value="feature">Feature</Option>
            <Option value="trending">Trending</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="product_name"
          label="Product name"
          rules={[
            {
              required: true,
              message: "Please input your productname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="product_description"
          label="Description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item name="engraving" label="Engraving">
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="price"
          label="Price (USD)"
          rules={[{ required: true, message: "Please input Price" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity (pcs)"
          rules={[{ required: true, message: "Please select your quantity!" }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Sale (%)">
          <Form.Item name="onSale" noStyle>
            <InputNumber
              min={0}
              max={100} // Set max value to 100
              onChange={(value) => {
                setSaleValue(value);
              }}
            />
          </Form.Item>
        </Form.Item>

        {saleValue !== null && saleValue > 0 && (
          <Form.Item label="Sale time" name="sale_time">
            <RangePicker
              showTime={{
                disabledHours,
                disabledMinutes,
                disabledSeconds,
              }}
              disabledDate={isBeforeToday}
            />
          </Form.Item>
        )}

        <Form.Item
          name="product_status"
          label="Status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Radio.Group>
            <Radio value="display">Display</Radio>
            <Radio value="waiting">Waiting</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="primary_img"
          label="Primary Image"
          valuePropName="fileList"
          getValueFromEvent={normFileSingle}
        >
          <Upload
            name="logo"
            multiple={false}
            beforeUpload={() => false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="cover_img"
          label="Cover Image"
          valuePropName="fileList"
          getValueFromEvent={normFileSingle}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            multiple={true}
            beforeUpload={() => false}
            className="avatar-uploader"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Image description">
          <Form.Item
            name="image_description"
            valuePropName="fileList"
            getValueFromEvent={normFileMulti}
            noStyle
          >
            <Upload.Dragger
              name="img_file"
              multiple={true}
              beforeUpload={() => false}
              listType="picture"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductFormItem;
