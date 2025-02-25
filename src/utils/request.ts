import { message } from 'antd';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestFunctionParams } from 'yapi-to-typescript';
import { RequestBodyType } from 'yapi-to-typescript';

import { Dispatch, store } from '@/models/store';
import I18N from '@/utils/I18N';

import Const from './const';
export interface RequestOptions {
  mock?: boolean;
  //接口错误是否弹窗
  errorSilent?: boolean;
}
const axios = Axios.create({
  timeout: 10000, //超时时间
});

interface ResBaseBody<T> {
  status: number;
  message: string;
  data: T;
}
let isRedirecting = false;
// let isFreeSSO = location.search.includes('ssotest=true') || process.env.UMI_ENV === 'dev';
export default function request<TResponseData>(
  payload: RequestFunctionParams,
  options: RequestOptions = {
    mock: false,
    errorSilent: false,
  }
): Promise<TResponseData> {
  // 基本地址
  const baseUrl = options.mock ? payload.mockUrl : location.origin;

  // 请求地址
  const url = `${baseUrl}${payload.path}`;

  // 具体请求逻辑
  const axiosOptions: AxiosRequestConfig = {
    url,
    method: payload.method,
    data: payload.hasFileData
      ? payload.getFormData()
      : payload.requestBodyType === RequestBodyType.json
      ? payload.data
      : payload.requestBodyType === RequestBodyType.form
      ? Object.keys(payload.data)
          .filter((key) => payload.data[key] != null)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(payload.data[key])}`)
          .join('&')
      : undefined,
    // TODO这个要看怎么拿这个参数了 客户端还是前端处理
    // headers: {
    //   appVersion: 'V3.67.0',
    //   deviceId: 654321,
    //   deviceType: 4,
    //   Authorization: localStorage.getItem(Const.LoginToken),
    // },
  };
  return axios(axiosOptions).then(
    (res: AxiosResponse<ResBaseBody<TResponseData>>) => {
      const result = res.data;
      if (!result || result.status !== 1) {
        const error = new AxiosError<ResBaseBody<TResponseData>>(
          `${result.message}`,
          res.status + '',
          res.config,
          res.request,
          res
        );

        //未登录
        //@ts-ignore
        if (result.status === 305) {
          (store.dispatch as Dispatch).user.login();
          throw error;
        }
        if (!options.errorSilent) {
          message.error(error.message);
        }
        throw error;
      }
      return result.data;
    },
    (err) => {
      //网络异常
      if (err instanceof AxiosError && (!err.response || !err.response.status)) {
        err.message = I18N.auto.wangLuoYiChang;
      }
      if (!options.errorSilent) {
        message.error(err.message);
      }
      return Promise.reject(err);
    }
  );
}
