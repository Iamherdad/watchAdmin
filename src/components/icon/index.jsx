import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3807557_0tp0a34spsoq.js",
});
export default function index({ type }) {
  return <IconFont type={type} />;
}
