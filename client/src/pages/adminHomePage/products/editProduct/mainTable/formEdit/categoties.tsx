import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { ProductDetail } from "../../../../../../constants/interface/adminInterface";
import dayjs from "dayjs";

export const Headphone: React.FC<{
  data: Partial<ProductDetail>;
  sendData: (data: any) => void;
}> = ({ data, sendData }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    sendData(form.getFieldsValue());
  }, []);

  return (
    <>
      <Form
        form={form}
        initialValues={data}
        onValuesChange={(_changedValues) => {
          const allValues = form.getFieldsValue();
          sendData(allValues);
        }}
      >
        <Form.Item name="impedance" label="IMPEDANCE">
          <Input
            defaultValue={data.impedance!}
            max={200}
            placeholder="100mm x 100mm x 9.9mm"
          />
        </Form.Item>

        <Form.Item name="battery_life" label="BATTERY LIFE">
          <Input
            defaultValue={data.battery_life!}
            max={200}
            placeholder="24 hours"
          />
        </Form.Item>

        <Form.Item name="material" label="MATERIALS">
          <Input
            defaultValue={data.material!}
            max={250}
            placeholder="Lambskin leather..."
          />
        </Form.Item>

        <Form.Item name="analog_headphone" label="ANALOG HEADPHONE CONNECTION">
          <Input
            defaultValue={data.analog_headphone!}
            max={200}
            placeholder="USB-C to 3.5mm cable"
          />
        </Form.Item>

        <Form.Item
          name="wired_digital_headphone"
          label="WIRED DIGITAL HEADPHONE"
        >
          <Input
            defaultValue={data.wired_digital_headphone!}
            max={200}
            placeholder="Supports hi-res audio..."
          />
        </Form.Item>

        <Form.Item name="cables" label="CABLES">
          <Input
            defaultValue={data.cables!}
            max={200}
            placeholder="USB-C to 3.5mm input cable"
          />
        </Form.Item>

        <Form.Item name="ear_coupling" label="EAR COUPLING">
          <Input
            defaultValue={data.ear_coupling!}
            max={200}
            placeholder="Over-Ear"
          />
        </Form.Item>

        <Form.Item name="talk_microphones" label="TALK MICROPHONES">
          <Input
            defaultValue={data.talk_microphones!}
            max={200}
            placeholder="4 Microphone talk"
          />
        </Form.Item>

        <Form.Item name="anc_microphones" label="ANC MICROPHONES">
          <Input
            defaultValue={data.anc_microphones!}
            max={200}
            placeholder="4 Microphone ANC"
          />
        </Form.Item>

        <Form.Item name="atena" label="ANTENNA">
          <Input
            defaultValue={data.atena!}
            max={200}
            placeholder="Internal Antenna"
          />
        </Form.Item>

        <Form.Item name="ear_pads" label="EAR PADS">
          <Input
            defaultValue={data.ear_pads!}
            max={200}
            placeholder="Replaceable Magnetic..."
          />
        </Form.Item>

        <Form.Item name="bluetooth_profile" label="BLUETOOTH PROFILE">
          <Input
            defaultValue={data.bluetooth_profile!}
            max={200}
            placeholder="Bluetooth® 5.1 range..."
          />
        </Form.Item>

        <Form.Item name="voice_assistant" label="VOICE ASSISTANT">
          <Input
            defaultValue={data.voice_assistant!}
            max={200}
            placeholder="Compatible with..."
          />
        </Form.Item>
      </Form>
    </>
  );
};

export const Earphone: React.FC<{
  data: Partial<ProductDetail>;
  sendData: (data: any) => void;
}> = ({ data, sendData }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    sendData(form.getFieldsValue());
  }, []);
  return (
    <>
      <Form
        form={form}
        initialValues={data}
        onValuesChange={(_changedValues) => {
          const allValues = form.getFieldsValue();
          sendData(allValues);
        }}
      >
        <Form.Item name="material" label="MATERIALS">
          <Input defaultValue={data.material!} placeholder="10 Watts" />
        </Form.Item>

        <Form.Item name="earphone_battery_life" label="EARPHONE BATTERY LIFE">
          <Input
            defaultValue={data.earphone_battery_life!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item name="earphone_charge_time" label="EARPHONE CHARGE TIME">
          <Input
            defaultValue={data.earphone_charge_time!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item name="microphone_type" label="MICROPHONE TYPE">
          <Input defaultValue={data.microphone_type!} placeholder="10 Watts" />
        </Form.Item>

        <Form.Item name="audio_format" label="AUDIO FORMAT">
          <Input defaultValue={data.audio_format!} placeholder="10 Watts" />
        </Form.Item>

        <Form.Item name="waterproof_level" label="WATERPROOF LEVEL">
          <Input defaultValue={data.waterproof_level!} placeholder="10 Watts" />
        </Form.Item>

        <Form.Item
          name="active_noise_cancelling"
          label="ACTIVE NOISE-CANCELLING"
        >
          <Input
            defaultValue={data.active_noise_cancelling!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item
          name="ambient_listening_modes"
          label="AMBIENT LISTENING MODES"
        >
          <Input
            defaultValue={data.ambient_listening_modes!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item
          name="charging_case_battery_life"
          label="CHARGING CASE BATTERY LIFE"
        >
          <Input
            defaultValue={data.charging_case_battery_life!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item
          name="charging_case_time_cable"
          label="CHARGING CASE TIME (CABLE)"
        >
          <Input
            defaultValue={data.charging_case_time_cable!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item
          name="charging_case_time_wireless"
          label="CHARGING CASE TIME (WIRELESS)"
        >
          <Input
            defaultValue={data.charging_case_time_wireless!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item name="connectivity_between" label="CONNECTIVITY BETWEEN">
          <Input
            defaultValue={data.connectivity_between!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item name="sport_earphones" label="SPORT EARPHONES">
          <Input defaultValue={data.sport_earphones!} placeholder="10 Watts" />
        </Form.Item>

        <Form.Item name="bluetooth_profile" label="BLUETOOTH PROFILE">
          <Input
            defaultValue={data.bluetooth_profile!}
            placeholder="10 Watts"
          />
        </Form.Item>

        <Form.Item name="connectivity_distance" label="CONNECTIVITY DISTANCE">
          <Input
            defaultValue={data.connectivity_distance!}
            placeholder="10 Watts"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export const Accessories: React.FC<{
  data: Partial<ProductDetail>;
  sendData: (data: any) => void;
}> = ({ data, sendData }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    sendData(form.getFieldsValue());
  }, []);
  return (
    <>
      <Form
        form={form}
        initialValues={data}
        onValuesChange={(_changedValues) => {
          const allValues = form.getFieldsValue();
          sendData(allValues);
        }}
      >
        <Form.Item name="max_output" label="MAX OUTPUT">
          <Input defaultValue={data.max_output!} placeholder="10 Watts" />
        </Form.Item>

        <Form.Item name="input" label="INPUT">
          <Input
            defaultValue={data.input!}
            placeholder="5V/1.2~1.5A, 9V/1.2~1.5A"
          />
        </Form.Item>

        <Form.Item name="compatibility" label="COMPATIBILITY">
          <Input.TextArea
            defaultValue={data.compatibility!}
            placeholder="Works with MW08 Sport and compatible products including Apple iPhone 8 and newer mobile digital devices."
          />
        </Form.Item>

        <Form.Item name="in_the_box" label="IN THE BOX">
          <Input.TextArea
            defaultValue={data.in_the_box!}
            placeholder="Wireless Charge Pad, 1M USB-C to USB-C Cable"
          />
        </Form.Item>

        <Form.Item name="power_supply" label="POWER SUPPLY">
          <Input defaultValue={data.power_supply!} placeholder="Not Included" />
        </Form.Item>
      </Form>
    </>
  );
};

//disabletime

const getCurrentHour = () => dayjs().hour();
const getCurrentMinute = () => dayjs().minute();
const getCurrentSecond = () => dayjs().second();

export const disabledHours = () => {
  let hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.filter((hour) => hour < getCurrentHour());
};

export const disabledMinutes = (selectedHour: number) => {
  if (selectedHour === getCurrentHour()) {
    let minutes = Array.from({ length: 60 }, (_, i) => i);
    return minutes.filter((minute) => minute < getCurrentMinute());
  }
  return [];
};

export const disabledSeconds = (
  selectedHour: number,
  selectedMinute: number
) => {
  if (
    selectedHour === getCurrentHour() &&
    selectedMinute === getCurrentMinute()
  ) {
    let seconds = Array.from({ length: 60 }, (_, i) => i);
    return seconds.filter((second) => second < getCurrentSecond());
  }
  return [];
};

export const isBeforeToday = (date: dayjs.Dayjs) => {
  return date.isBefore(dayjs(), "day");
};

export function removeNullAndUndefinedProperties<
  T extends { [key: string]: any }
>(obj: T): Partial<T> {
  const result: Partial<T> = { ...obj };
  for (const key in result) {
    if (result[key] === null || result[key] === undefined) {
      delete result[key];
    }
  }
  return result;
}
