import React, { useEffect, useState } from "react";
import ImageDisplay from "./imageDisplay/ImageDisplay";
import {
  Form,
  Row,
  Col,
  Select,
  InputNumber,
  Radio,
  Input,
  DatePicker,
  Divider,
  message,
  Button,
} from "antd";
import {
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  isBeforeToday,
} from "./categoties";
import { useLocation } from "react-router-dom";
import {
  getProductEditRequest,
  sentEditProductRequest,
} from "../../../../../../store/slices/productSlice/editProduct-slice";
import { productEditSelector } from "../../../../../../store/selectors/productSelector";
import { useDispatch, useSelector } from "react-redux";
import { isEmptyObject } from "../../../../../adminHomePage/AdminHome";
import { Product } from "../../../../../../constants/interface/adminInterface";
import {
  Accessories,
  Headphone,
  Earphone,
  removeNullAndUndefinedProperties,
} from "./categoties";
import { ProductDetail } from "../../../../../../constants/interface/adminInterface";
import dayjs from "dayjs";
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const FormEdit: React.FC = () => {
  const [form] = Form.useForm();
  const [saleValue, setSaleValue] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("product-id");
  const data: Product = useSelector(productEditSelector) as Product;
  const [primaryImage, setPrimaryImage] = useState<string[]>([]);
  const [coverImages, setCoverImages] = useState<string[]>([]);
  const [descriptionImages, setDescriptionImages] = useState<string[]>([]);
  const [receivedData, setReceivedData] = useState<Partial<ProductDetail>>({});

  const dispatch = useDispatch();

  const defaultValue: any =
    data.sale_start && data.sale_end
      ? [dayjs(data.sale_start, dateFormat), dayjs(data.sale_end, dateFormat)]
      : undefined;

  useEffect(() => {
    if (!data || isEmptyObject(data)) {
      return;
    }
    setCategory(data?.categories?.[0]?.category_name);
    if (data && data.onSale) {
      setSaleValue(data.onSale);
    }
  }, [data]);

  useEffect(() => {
    if (!productId) {
      return;
    }
    const payload = {
      product_id: productId,
    };
    dispatch(getProductEditRequest(payload));
  }, [productId]);

  useEffect(() => {
    if (!data || isEmptyObject(data)) {
      return;
    }
    console.log(data);
    console.log("???");

    form.setFieldsValue({
      category_name: data.categories[0].category_name,
      product_type: data.product_type,
      price: parseFloat(data.price),
      engraving: data.engraving,
      product_name: data.product_name,
      quantity: data.quantity,
      product_description: data.product_description,
      product_status: data.details[0].product_status,
      onSale: data.onSale,
    });
  }, [data]);

  const onFinish = () => {
    const formData = form.getFieldsValue();
    let sale_start;
    let sale_end;

    if (formData.sale_time) {
      sale_start = new Date(formData.sale_time[0]);
      sale_end = new Date(formData.sale_time[1]);
    }

    const newFormData = {
      category_name: formData.category_name,
      engraving: formData.engraving,
      onSale: formData.onSale,
      price: formData.price,
      product_description: formData.product_description,
      product_name: formData.product_name,

      product_type: formData.product_type,
      quantity: formData.quantity,
      sale_start: sale_start,
      sale_end: sale_end,
    };

    const detailFormdata = {
      dimensions: formData.dimensions,
      drivers: formData.drivers,
      model: formData.model,
      weight: formData.weight,
      product_status: formData.product_status,
    };

    const productInfo = removeNullAndUndefinedProperties(newFormData);
    const removeNullAndUndefinedProductDetail =
      removeNullAndUndefinedProperties(detailFormdata);
    const removeNullAndUndefinedReceivedData =
      removeNullAndUndefinedProperties(receivedData);

    const productDetails = {
      ...removeNullAndUndefinedProductDetail,
      ...removeNullAndUndefinedReceivedData,
    };
    const payload = {
      productInfo: productInfo,
      productDetails: productDetails,
      primaryImage: primaryImage,
      coverImages: coverImages,
      descriptionImages: descriptionImages,
    };

    dispatch(
      sentEditProductRequest({ productId: productId, payload: payload })
    );
  };

  const handleDataFromChild = (data: Partial<ProductDetail>) => {
    setReceivedData(data);
  };
  const handlePrimaryImageUpdate = (primaryImage: string | undefined) => {
    if (primaryImage !== undefined) {
      setPrimaryImage([primaryImage]);
    }
  };

  //state img
  const handleImagesUpdate = (images: string[], source: string) => {
    switch (source) {
      case "primary":
        setPrimaryImage(images);
        break;
      case "coverImages":
        setCoverImages(images);
        break;
      case "images":
        setDescriptionImages(images);
        break;
      default:
        message.error("unknown data");
        break;
    }
  };
  return (
    <div>
      <Form
        form={form}
        name="edit-product"
        // {...formItemLayout}
        onFinish={onFinish}
        style={{ maxWidth: "100%", padding: " 0 50px" }}
      >
        <Divider orientation="right" orientationMargin={50}>
          Product Info
        </Divider>
        <Row>
          <Col span={6}>
            <Form.Item
              // labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              name="category_name"
              label="Categories"
              hasFeedback
              rules={[
                { required: true, message: "Please select your categories!" },
              ]}
            >
              <Select placeholder="Categories">
                <Option value="headphones">HEADPHONES</Option>
                <Option value="earphones">EARPHONES</Option>
                <Option value="accessories">ACCESSORIES</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 10 }}
              name="product_type"
              label="Type"
              hasFeedback
              rules={[{ required: true, message: "Please select your Type!" }]}
            >
              <Select placeholder="Type">
                <Option value="new">New</Option>
                <Option value="feature">Feature</Option>
                <Option value="trending">Trending</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
              name="price"
              label="Price (USD)"
              rules={[{ required: true, message: "Please input Price" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
              name="engraving"
              label="Engraving"
            >
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" orientationMargin={50}></Divider>
        <Row>
          <Col span={8}>
            {" "}
            <Form.Item
              // labelCol={{ span: 8 }}
              wrapperCol={{ span: 18 }}
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
          </Col>
          <Col span={6}>
            {" "}
            <Form.Item
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 8 }}
              name="quantity"
              label="Quantity (pcs)"
              rules={[
                { required: true, message: "Please select your quantity!" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={10}>
            {" "}
            <Form.Item
              name="product_description"
              label="Description"
              rules={[{ required: true, message: "Please input description" }]}
            >
              <Input maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="right" orientationMargin={50}></Divider>
        <Row>
          <Col span={6}>
            {" "}
            <Form.Item
              // labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="product_status"
              label="Status"
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Radio.Group>
                <Radio value="display">Display</Radio>
                <Radio value="waiting">Waiting</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={6}>
            {" "}
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
          </Col>
          <Col span={6}>
            {" "}
            {saleValue !== null && saleValue > 0 && (
              <Form.Item label="Sale time" name="sale_time">
                <RangePicker
                  defaultValue={defaultValue}
                  showTime={{
                    disabledHours,
                    disabledMinutes,
                    disabledSeconds,
                  }}
                  disabledDate={isBeforeToday}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Divider orientation="right" orientationMargin={50}>
          Product images
        </Divider>

        <Row>
          {data.primary_img && (
            <Col span={6}>
              <Form.Item label="Primary Image">
                <ImageDisplay
                  onImagesUpdate={(images) =>
                    handleImagesUpdate(images, "primary")
                  }
                  onPrimaryImageUpdate={handlePrimaryImageUpdate}
                  limit={1}
                  src={data.primary_img}
                />
              </Form.Item>
            </Col>
          )}

          {data.coverImages && (
            <Col span={6}>
              <Form.Item label="Cover Image">
                <ImageDisplay
                  onImagesUpdate={(images) =>
                    handleImagesUpdate(images, "coverImages")
                  }
                  limit={1}
                  data={data.coverImages.map((image) => image.image_url)}
                />
              </Form.Item>
            </Col>
          )}

          {data.images && (
            <Col span={12}>
              <Form.Item label="Image description">
                <ImageDisplay
                  onImagesUpdate={(images) =>
                    handleImagesUpdate(images, "images")
                  }
                  limit={5}
                  data={data.images.map((image) => image.image_url)}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Divider orientation="right" orientationMargin={50}>
          Product details
        </Divider>
        <Row>
          {data.details && (
            <Col span={12}>
              <Form.Item
                initialValue={data.details[0].model}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                name="model"
                label="MODEL"
              >
                <Input
                  defaultValue={data.details[0].model!}
                  placeholder="MC100"
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                name="dimensions"
                label="DIMENSIONS"
                initialValue={data.details[0].dimensions}
              >
                <Input
                  defaultValue={data.details[0].dimensions!}
                  placeholder="100mm x 100mm x 9.9mm"
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                name="drivers"
                label="DRIVERS"
                initialValue={data.details[0].drivers}
              >
                <Input
                  defaultValue={data.details[0].drivers!}
                  placeholder="100mm x 100mm x 9.9mm"
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                name="weight"
                label="WEIGHT"
                initialValue={data.details[0].weight}
              >
                <Input
                  defaultValue={data.details[0].weight!}
                  placeholder="90.7g"
                />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            {category === "headphones" && (
              <Headphone
                data={data.details[0]}
                sendData={handleDataFromChild}
              />
            )}
            {category === "earphones" && (
              <Earphone data={data.details[0]} sendData={handleDataFromChild} />
            )}
            {category === "accessories" && (
              <Accessories
                data={data.details[0]}
                sendData={handleDataFromChild}
              />
            )}
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormEdit;
