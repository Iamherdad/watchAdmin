import React, { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
const { TextArea } = Input;
import { UploadOutlined } from "@ant-design/icons";

import { uploadVersion } from "@/service/modules/version";

export default function content(props) {
  const [form] = Form.useForm();

  const formProps = {
    name: "file",
    action: "",
    onChange: (info) => {},
    beforeUpload: (file) => false,
  };
  //上传
  const onFinish = async (values) => {
    const { desc, hardwareVer, softwareVer, uploadurl } = values;
    const versionInfo = {
      supportHardVersion: hardwareVer,
      time: +new Date(),
      version: softwareVer,
      versionDesc: desc,
      newVersion: "true",
    };
    let excelFile = uploadurl[0].originFileObj;
    let formData = new FormData();
    formData.append("excelFile", excelFile);
    formData.append("versionInfo", JSON.stringify(versionInfo));
    let result = await uploadVersion(formData);
    if (result && result.id) {
      message.success("固件上传成功");
      form.resetFields();
    }
  };
  //选择文件回调
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="软件版本"
          name="softwareVer"
          rules={[
            { required: true, message: "软件版本不能为空!" },
            {
              pattern: new RegExp(/^[1-9]\d?(.\d{1,2}){2}$/),
              message: "请确认输入格式是否为x.x.x",
            },
          ]}
        >
          <Input placeholder="只能输入数字,例如1.0.1" />
        </Form.Item>

        <Form.Item
          label="硬件版本"
          name="hardwareVer"
          rules={[
            { required: true, message: "硬件版本号不能为空!" },
            {
              pattern: new RegExp(/^[1-9]\d?(.\d{1,2}){2}$/),
              message: "请确认输入格式是否为x.x.x",
            },
          ]}
        >
          <Input placeholder="只能输入数字,例如1.0.1" />
        </Form.Item>
        <Form.Item
          label="上传固件"
          name="uploadurl"
          rules={[{ required: true, message: "上传地址不能为空!" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...formProps} maxCount={1} accept=".bin,.Bin">
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="版本描述"
          name="desc"
          rules={[{ required: true, message: "版本描述!" }]}
        >
          <TextArea autoSize />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            立即上传
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
