import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { ProductFormItemProps } from "../../../../../../constants/interface/propsInterface";
import { useSelector, useDispatch } from "react-redux";
import { resetFormAddProductSelector } from "../../../../../../store/selectors/productSelector";
import { setDefaultResetAllForm } from "../../../../../../store/slices/productSlice/product-slice";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

export const headphone = (
  <>
    <Form.Item name="impedance" label="IMPEDANCE">
      <Input max={200} placeholder="100mm x 100mm x 9.9mm" />
    </Form.Item>

    <Form.Item name="battery_life" label="BATTERY LIFE">
      <Input max={200} placeholder="24 hours" />
    </Form.Item>

    <Form.Item name="material" label="MATERIALS">
      <Input max={250} placeholder="Lambskin leather..." />
    </Form.Item>

    <Form.Item name="analog_headphone" label="ANALOG HEADPHONE CONNECTION">
      <Input max={200} placeholder="USB-C to 3.5mm cable" />
    </Form.Item>

    <Form.Item name="wired_digital_headphone" label="WIRED DIGITAL HEADPHONE">
      <Input max={200} placeholder="Supports hi-res audio..." />
    </Form.Item>

    <Form.Item name="cables" label="CABLES">
      <Input max={200} placeholder="USB-C to 3.5mm input cable" />
    </Form.Item>

    <Form.Item name="ear_coupling" label="EAR COUPLING">
      <Input max={200} placeholder="Over-Ear" />
    </Form.Item>

    <Form.Item name="talk_microphones" label="TALK MICROPHONES">
      <Input max={200} placeholder="4 Microphone talk" />
    </Form.Item>

    <Form.Item name="anc_microphones" label="ANC MICROPHONES">
      <Input max={200} placeholder="4 Microphone ANC" />
    </Form.Item>

    <Form.Item name="atena" label="ANTENNA">
      <Input max={200} placeholder="Internal Antenna" />
    </Form.Item>

    <Form.Item name="ear_pads" label="EAR PADS">
      <Input max={200} placeholder="Replaceable Magnetic..." />
    </Form.Item>

    <Form.Item name="bluetooth_profile" label="BLUETOOTH PROFILE">
      <Input max={200} placeholder="Bluetooth® 5.1 range..." />
    </Form.Item>

    <Form.Item name="voice_assistant" label="VOICE ASSISTANT">
      <Input max={200} placeholder="Compatible with..." />
    </Form.Item>
  </>
);

export const earphone = (
  <>
    <Form.Item name="material" label="MATERIALS">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="earphone_battery_life" label="EARPHONE BATTERY LIFE">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="earphone_charge_time" label="EARPHONE CHARGE TIME">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="microphone_type" label="MICROPHONE TYPE">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="audio_format" label="AUDIO FORMAT">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="waterproof_level" label="WATERPROOF LEVEL">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="active_noise_cancelling" label="ACTIVE NOISE-CANCELLING">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="ambient_listening_modes" label="AMBIENT LISTENING MODES">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item
      name="charging_case_battery_life"
      label="CHARGING CASE BATTERY LIFE"
    >
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item
      name="charging_case_time_cable"
      label="CHARGING CASE TIME (CABLE)"
    >
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item
      name="charging_case_time_wireless"
      label="CHARGING CASE TIME (WIRELESS)"
    >
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="connectivity_between" label="CONNECTIVITY BETWEEN">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="sport_earphones" label="SPORT EARPHONES">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="bluetooth_profile" label="BLUETOOTH PROFILE">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="connectivity_distance" label="CONNECTIVITY DISTANCE">
      <Input placeholder="10 Watts" />
    </Form.Item>
  </>
);

export const accessories = (
  <>
    <Form.Item name="max_output" label="MAX OUTPUT">
      <Input placeholder="10 Watts" />
    </Form.Item>

    <Form.Item name="input" label="INPUT">
      <Input placeholder="5V/1.2~1.5A, 9V/1.2~1.5A" />
    </Form.Item>

    <Form.Item name="compatibility" label="COMPATIBILITY">
      <Input.TextArea placeholder="Works with MW08 Sport and compatible products including Apple iPhone 8 and newer mobile digital devices." />
    </Form.Item>

    <Form.Item name="in_the_box" label="IN THE BOX">
      <Input.TextArea placeholder="Wireless Charge Pad, 1M USB-C to USB-C Cable" />
    </Form.Item>

    <Form.Item name="power_supply" label="POWER SUPPLY">
      <Input placeholder="Not Included" />
    </Form.Item>
  </>
);

const ProductDetailsForm: React.FC<ProductFormItemProps> = ({
  sendDataToParent,
  category,
}) => {
  const [childForm] = Form.useForm();
  const resetFormKey = useSelector(resetFormAddProductSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resetFormKey === false) {
      return;
    }
    childForm.resetFields();
    dispatch(setDefaultResetAllForm());
  }, [resetFormKey]);

  return (
    <>
      <Form
        form={childForm}
        {...formItemLayout}
        onValuesChange={(_changedValues, allValues) => {
          sendDataToParent(allValues);
        }}
      >
        <Form.Item name="model" label="MODEL" rules={[{ required: true }]}>
          <Input placeholder="MC100" />
        </Form.Item>

        <Form.Item
          name="dimensions"
          label="DIMENSIONS"
          rules={[{ required: true }]}
        >
          <Input placeholder="100mm x 100mm x 9.9mm" />
        </Form.Item>

        <Form.Item name="drivers" label="DRIVERS" rules={[{ required: true }]}>
          <Input placeholder="100mm x 100mm x 9.9mm" />
        </Form.Item>

        <Form.Item name="weight" label="WEIGHT" rules={[{ required: true }]}>
          <Input placeholder="90.7g" />
        </Form.Item>

        {category === "headphones" && headphone}
        {category === "earphones" && earphone}
        {category === "accessories" && accessories}
      </Form>
    </>
  );
};

export default ProductDetailsForm;
