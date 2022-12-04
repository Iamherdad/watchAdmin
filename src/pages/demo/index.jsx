import React, { useEffect, useState } from "react";
import { Button, message, Modal, Space, Table, Popconfirm } from "antd";
import Work from "./cpns/work";
import CommonWork from "@/components/work";
import { useSelector, useDispatch } from "react-redux";
import { resetWorkInfo } from "@/store/modules/demo";
import { getALLdemo, setDemo } from "@/service/modules/demo";
import { timeFormat } from "@/utils";
import "./index.scss";

export default function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const work = useSelector((store) => store.demolSlice.work);
  const iptVal = useSelector((store) => store.demolSlice.workName);
  const [demoList, setDemList] = useState([]);
  const dispatch = useDispatch();
  const workMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  useEffect(() => {
    getALLdemo().then((res) => {
      setDemList(res.data);
    });
  }, []);
  const columns = [
    {
      title: "试例",
      dataIndex: "work",
      render: (_, text) => (
        <CommonWork
          workInfo={{
            ledAnimationArray: [text.work],
            time: text.timeSlot,
          }}
        ></CommonWork>
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
      render: (_, text) => {
        return (
          <Popconfirm
            onConfirm={() => confirm(text._id)}
            onCancel={cancel}
            title="确定下架该示例吗"
          >
            <Button>下架</Button>
          </Popconfirm>
        );
      },
    },
  ];
  const data = demoList.map((item, index) => {
    return {
      key: index,
      work: item.work,
      workName: item.workName,
      tags: ["nice", "developer"],
      time: item.time ? timeFormat(item.time) : "---",
      _id: item._id,
    };
  });

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
      let result = await setDemo({
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
        dispatch(resetWorkInfo());
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const confirm = async (id) => {
    let result = await setDemo({
      type: "del",
      id,
    });
    if (result.deleted == "1") {
      message.success("下架成功");
      getALLdemo().then((res) => {
        setDemList(res.data);
      });
    } else {
      message.error("服务器繁忙");
    }
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <div className="demo">
      <div>
        <Button type="primary" onClick={showModal} className="upload-btn">
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
          <Table columns={columns} dataSource={data} className="custom-table" />
        </div>
      </div>
    </div>
  );
}
