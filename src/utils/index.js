import dayjs from "dayjs";

export const timeFormat = (time, tType = "YYYY-MM-DD") => {
  if (typeof time == "number" && typeof tType == "string") {
    return dayjs(time).format(tType);
  } else {
    throw Error("timeFormat入参类型错误");
  }
};
