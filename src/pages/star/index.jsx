import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Avatar, Image, message, Popconfirm } from "antd";
import Work from "@/components/work";

import { getStarWorkList, delStarWork } from "@/service/modules/star";
import { timeFormat } from "@/utils";

import "./index.scss";
export default function index() {
  const [workList, setWorkList] = useState([]);
  useEffect(() => {
    getStarWorkList().then((res) => {
      setWorkList(res.data);
    });
  }, []);
  const columns = [
    {
      title: "作品",
      dataIndex: "works",
      key: "works",
      render: (_, text) => (
        <Work
          workInfo={{
            ledAnimationArray: text.works,
            time: text.timeSlot,
          }}
        />
      ),
    },
    {
      title: "作品名",
      dataIndex: "workName",
      key: "workName",
    },

    {
      title: "用户信息",
      dataIndex: "authorAvatar",
      key: "authorAvatar",
      render: (_, authorAvatar) => (
        <div className="userInfo">
          <Avatar
            style={{ marginLeft: 15 }}
            src={
              <Avatar
                src={
                  <Image
                    src={authorAvatar.authorAvatar}
                    style={{ width: 32 }}
                  />
                }
              />
            }
          />
          <span className="authorName">{authorAvatar.authorName}</span>
        </div>
      ),
    },
    {
      title: "发布时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "管理",
      key: "edit",
      render: (_, record) => (
        <Popconfirm
          title="确定下线该作品吗"
          onConfirm={() => confirm(record.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button> {record.edit}</Button>
        </Popconfirm>
      ),
    },
  ];

  const data = workList.map((ite, ind) => {
    return {
      key: ite._id,
      works: ite.ledDisplay ? ite.ledDisplay : ite.ledAnimationArray,
      workName: ite.workName,
      time: timeFormat(ite.time),
      authorName: ite.authorName,
      authorAvatar: ite.authorAvatar,
      edit: "下线该作品",
      timeSlot: ite.timeSlot,
      id: ite._id,
    };
  });

  const confirm = async (id) => {
    const result = await delStarWork(id);
    if (result.deleted == 1) {
      getStarWorkList().then((res) => {
        setWorkList(res.data);
        message.success("下线成功");
      });
    } else {
      message.error("网络繁忙");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <div className="star">
      <Table columns={columns} dataSource={data} className="custom-table" />
    </div>
  );
}
