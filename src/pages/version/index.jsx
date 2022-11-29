import React, { useEffect, useState } from "react";
import { Input, Button, Table, Tag, Modal } from "antd";
import Content from "./cpns/Content";

import { getVersion } from "@/service/modules/version";
import { timeFormat } from "@/utils";
export default function index() {
  const [versionList, setVersionList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getVersion().then((res) => {
      console.log(res.data);
      setVersionList(res.data);
    });
  }, []);

  const dataSource = versionList?.map((item, index) => {
    return {
      key: index,
      version: item.data.version,
      hard: item.data.supportHardVersion,
      desc: item.data.versionDesc,
      verAdmin: index + 1 === versionList.length ? true : false,
      time: timeFormat(item.data.time),
    };
  });
  const columns = [
    {
      title: "版本号",
      dataIndex: "version",
      key: "name",
      sorter: (a, b) =>
        a.version.replace(/\./g, "") - b.version.replace(/\./g, ""),
    },
    {
      title: "硬件支持",
      dataIndex: "hard",
      key: "hard",
    },

    {
      title: "版本描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "版本管理",
      dataIndex: "verAdmin",
      key: "verAdmin",
      render: (verAdmin) =>
        verAdmin ? <Tag color="#87d068"> 当前版本</Tag> : null,
    },
    {
      title: "上传时间",
      dataIndex: "time",
      key: "time",
    },
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <div className="search">
        <Input placeholder="搜索版本" />
      </div>
      <div className="upload">
        <Button type="primary" onClick={showModal}>
          上传新版本
        </Button>
      </div>
      <div className="dataView">
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <Modal
        title="版本详情"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={false}
        footer={null}
      >
        <Content />
      </Modal>
    </div>
  );
}
