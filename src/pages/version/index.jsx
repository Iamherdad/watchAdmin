import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Tag,
  Modal,
  Switch,
  Popconfirm,
  message,
} from "antd";
import Content from "./cpns/Content";

import { getVersion, versionRollback } from "@/service/modules/version";
import { timeFormat } from "@/utils";

import "./index.scss";

export default function index() {
  const [versionList, setVersionList] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getVersion().then((res) => {
      setVersionList(res.data);
    });
  }, []);

  const dataSource = versionList?.map((item, index) => {
    return {
      key: index,
      version: item.version,
      hard: item.supportHardVersion,
      desc: item.versionDesc,
      verAdmin: {
        tagType: item.newVersion == "true" ? true : false,
        verInfo: item._id,
      },
      time: timeFormat(item.time || ""),
    };
  });
  const columns = [
    {
      title: "软件版本",
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
      render: ({ tagType, verInfo }) =>
        tagType ? (
          <Tag color="#87d068"> 当前版本</Tag>
        ) : (
          <Popconfirm
            title="确定回滚到此版本吗？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handlePopOk(verInfo)}
          >
            <Tag color="#f50" style={{ cursor: "pointer" }}>
              回滚至此版本
            </Tag>
          </Popconfirm>
        ),
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

  const versionSwitch = () => {
    // console.log(123);
  };

  const handlePopOk = async (verId) => {
    const param = {
      type: "rollback",
      id: verId,
    };
    let result = await versionRollback(param);
    if (result.code == 200) {
      message.success("回滚成功");
      let newCurrentVer = await getVersion();
      setVersionList(newCurrentVer.data);
    }
  };
  return (
    <div className="version">
      {/* <div className="search">
        <Input placeholder="搜索版本" />
      </div> */}
      <div className="upload">
        <Button type="primary" onClick={showModal}>
          上传新版本
        </Button>
        {/* <div>
          <Switch
            checkedChildren="固件推送正常"
            unCheckedChildren="停止推送"
            defaultChecked
          />
        
        </div> */}
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
        onclose={handleCancel}
      >
        <Content />
      </Modal>
    </div>
  );
}
