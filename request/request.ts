import { getLoc } from "@public/index";
import { message } from "antd";
import axios from "axios";
import { REGISTERED_ADDRESS, LOGIN_ADDRESS } from "./apis";

const BASE_URL = "http://192.168.1.191:3000/";

type RequestConfig = {
  method?: "get" | "post" | "put" | "delete";
  hint: boolean;
};
export type ResponseFun<T> = (
  url: string,
  data?: any,
  config?: RequestConfig
) => Promise<T>;

export type Response = {
  config?: any;
  data: any;
  headers?: any;
  request?: any;
  status: number;
  statusText?: string;
};
export type ErrorResponse = {
  code?: string;
  config?: any;
  message?: string;
  name?: string;
  request?: any;
  response: Response;
};

/** 默认请求头 */
const REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Accept":"*/*",
};
/**带token请求头 */
const setTokenToHeader = () => ({
  ...REQUEST_HEADER,
  Authorization: getLoc("token"),
});
const request: ResponseFun<any> = (
  url,
  data = {},
  config = {
    method: "post",
    hint: true,
  }
) => {
  url = BASE_URL + url;
  let headers = [REGISTERED_ADDRESS, LOGIN_ADDRESS].includes(url)
    ? REQUEST_HEADER
    : setTokenToHeader();
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: config.method || "post",
      data,
      headers,
    })
      .then((res: Response) => {
        if (res.status !== 200) {
          reject(res.data);
          message.error(res.data.message);
        } else {
          resolve(res.data);
        }
      })
      .catch((err: ErrorResponse) => {
        console.log('111err',err);
        
        if (config.hint) message.error(err.response.data.message);
        reject(err.response.data);
      });
  });
};
export default request;
