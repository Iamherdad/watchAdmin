import Axios from "axios";
import { hideLoading, showLoading } from "@/pages/loading";

export default function axios(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = Axios.create({
      baseURL: import.meta.env.DEV
        ? "/miniapp"
        : "https://tcb-cvsk7m1c8a0975-8dbsfc582f419.service.tcloudbase.com/miniapp",
      timeout: 5000,
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      (config) => {
        showLoading();
        return config;
      },
      (err) => {
        return err;
      }
    );

    instance.interceptors.response.use(
      (response) => {
        hideLoading();
        return response.data;
      },
      (err) => {
        console.log(err, "相应拦截错误");
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权的访问";
              break;
          }
        }
        hideLoading();
        return err;
      }
    );

    // 2.传入对象进行网络请求
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
