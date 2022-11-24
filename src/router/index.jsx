/*
 * @Author: lipengfei 1401446942@qq.com
 * @Date: 2022-11-23 11:09:00
 * @LastEditors: lipengfei 1401446942@qq.com
 * @LastEditTime: 2022-11-23 11:37:10
 * @FilePath: \watch-admin\src\router\index.jsx
 * @Description:
 *
 * Copyright (c) 2022 by lipengfei 1401446942@qq.com, All Rights Reserved.
 */
import { useRoutes } from "react-router-dom";
import routes from "./config.js";

const Router = () => {
  return useRoutes(routes);
};

export default Router;
