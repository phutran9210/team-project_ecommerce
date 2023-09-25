import React, { useState } from "react";

import { Button, Row, Space, Col, Spin, Modal } from "antd";
import ProductDetailsForm from "./productDetails/ProductDetailsForm";
import { createNewProduct } from "../../../../../service/product/product";
import ProductFormItem from "./productDetails/ProductFormItem";
import { sendResetAllForm } from "../../../../../store/slices/productSlice/product-slice";
import { useDispatch } from "react-redux";

const UploadFormComponent: React.FC = () => {
  const [productData, setProductData] = useState<any>(null);
  const [productDetailData, setProductDetailData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Hàm callback để nhận dữ liệu từ ProductFormItem
  const handleProductData = (data: any) => {
    setProductData(data);
  };

  // Hàm callback để nhận dữ liệu từ ProductDetailsForm
  const handleProductDetailData = (data: any) => {
    setProductDetailData(data);
  };

  const onFinish = async () => {
    const formData = new FormData();

    const copyProductData = { ...productData };

    copyProductData.image_description.forEach((file: any) => {
      formData.append("image_description", file.originFileObj);
    });
    copyProductData.primary_img.forEach((file: any) => {
      formData.append("primary_img", file.originFileObj);
    });
    copyProductData.cover_img.forEach((file: any) => {
      formData.append("cover_img", file.originFileObj);
    });

    // Loại bỏ trường hình ảnh khỏi copyProductData
    delete copyProductData.image_description;
    delete copyProductData.primary_img;
    delete copyProductData.cover_img;

    // Thêm copyProductData và productDetailData vào formData dưới dạng chuỗi JSON
    formData.append("product", JSON.stringify(copyProductData));
    formData.append("detail", JSON.stringify(productDetailData));

    try {
      setLoading(true);
      const response = await createNewProduct(formData);
      if (response.data.status === 201) {
        handleReset();
        setLoading(false);
        Modal.success({
          title: "Notification!",
          content: "Created product Successfully!",
          okText: "OK",
        });
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };

  //Reset form
  const handleReset = () => {
    dispatch(sendResetAllForm());
  };
  return (
    <>
      <Spin size="large" spinning={loading} delay={500}>
        <Row gutter={[0, 24]}>
          <Col span={12}>
            <ProductFormItem
              sendDataToParent={handleProductData}
              onCategoryChange={(category: string) =>
                setSelectedCategory(category)
              }
            />
          </Col>
          <Col span={12}>
            <ProductDetailsForm
              sendDataToParent={handleProductDetailData}
              category={selectedCategory}
            />
          </Col>
          <Space>
            <Button type="primary" onClick={onFinish}>
              Submit
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Row>
      </Spin>
    </>
  );
};

export default UploadFormComponent;
