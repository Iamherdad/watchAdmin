import React, { useEffect, useState } from "react";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import Work from "./cpns/work";
import CommonWork from "@/components/work";
import { useSelector } from "react-redux";

import { addDemo, getALLdemo } from "@/service/modules/demo";
import "./index.scss";

export default function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const work = useSelector((store) => store.demolSlice.work);
  const iptVal = useSelector((store) => store.demolSlice.workName);
  const [demoList, setDemList] = useState([]);
  const workMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  useEffect(() => {
    getALLdemo().then((res) => {
      console.log(res.data);
      setDemList(res.data);
    });
  }, []);
  const columns = [
    {
      title: "试例",
      dataIndex: "work",
      render: (text) => (
        <div>{text.workName}</div>
        // <CommonWork
        //   workInfo={{
        //     ledAnimationArray: text.works,
        //     time: text.timeSlot,
        //   }}
        // ></CommonWork>
      ),
    },
    {
      title: "名称",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "上传时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "下架",
      key: "tags",
      dataIndex: "tags",
      render: () => {
        return <Tag>123</Tag>;
      },
    },
  ];
  const data = demoList.map((item, index) => {
    return {
      key: index,
      work: item.work,
      workName: item.workName,
      time: item.time || "",
      tags: ["nice", "developer"],
    };
  });
  //   const data = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //       tags: ["nice", "developer"],
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //       tags: ["loser"],
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sidney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //   ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (
      JSON.stringify(work) === JSON.stringify(workMap) ||
      iptVal.replace(/\s+/g, "").length === 0
    ) {
      return message.error("名称不能为空或无效作品");
    } else {
      let result = await addDemo({
        type: "add",
        work,
        workName: iptVal,
        time: +new Date(),
      });
      if (result.inserted == 1) {
        message.success("上传成功");
        getALLdemo().then((res) => {
          setDemList(res.data);
        });
        setIsModalOpen(false);
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div>
        <Button type="primary" onClick={showModal}>
          上传示例
        </Button>
        <Modal
          title="绘制板"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="上传"
          bodyStyle={{ backgroundColor: "#333" }}
        >
          <Work />
        </Modal>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
}
