import React, { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { uploadVersion } from "@/service/modules/version";
// import { ArrayBufferToJson } from "util";
import fs from "fs";

export default function content() {
  const [sendFileList, setSendFiles] = useState([]);

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      console.log(file, "file");
      return false;
    },
  };
  //上传
  const onFinish = (values) => {
    const { desc, linkurl, hardwareVer, softwareVer, uploadurl } = values;
    console.log(uploadurl, "uploadurl");
    let fRender = new FileReader();
    fRender.readAsDataURL(uploadurl[0].originFileObj);
    fRender.onload = async (event) => {
      let result = await uploadVersion({
        dataUrl: event.target.result,
        name: "version",
      });
    };
    return;
  };
  //选择文件回调
  const normFile = (e) => {
    // console.log("Upload event:", e);
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
      >
        <Form.Item
          label="软件版本"
          name="softwareVer"
          initialValue="1.0.1"
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
          initialValue="1.0.1"
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
          label="连接地址"
          name="linkurl"
          initialValue="https://123.com"
          rules={[
            { required: true, message: "连接地址不能为空!" },
            {
              pattern: new RegExp(
                /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
              ),
              message: "url格式有误",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="上传地址"
          name="uploadurl"
          rules={[{ required: true, message: "上传地址不能为空!" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="版本描述"
          name="desc"
          initialValue="我没什么好说的"
          rules={[{ required: true, message: "版本描述!" }]}
        >
          <Input />
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
