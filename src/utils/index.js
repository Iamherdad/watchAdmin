import dayjs from "dayjs";
// import { Buffer } from "buffer";

export const timeFormat = (time, tType = "YYYY-MM-DD") => {
  if (typeof time == "number" && typeof tType == "string") {
    return dayjs(time).format(tType);
  } else {
    throw Error("timeFormat入参类型错误");
  }
};

export const ArrayBufferToJson = (arrayBuffer) => {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer.toJSON();
};
