import { defineConfig, QueryStringArrayFormat } from 'yapi-to-typescript';

import { yapiServerUrl, yapiToken } from './project.config';
export default defineConfig([
  {
    serverUrl: yapiServerUrl,
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    queryStringArrayFormat: QueryStringArrayFormat.repeat,
    prodEnvName: 'production',
    outputFilePath: 'src/api/index.ts',
    requestFunctionFilePath: 'src/utils/request.ts',
    dataKey: 'data',

    projects: [
      {
        token: yapiToken,
        categories: [
          {
            id: [6521, 6525, 6529],
            getRequestFunctionName(interfaceInfo, changeCase) {
              // let isDashboard = interfaceInfo.path.startsWith('/api/dashboard');
              //过滤(api | inner_api)/admin/v1的前缀
              const reg = /^\/(api)\/(bs-todo)+\/v\d\//;
              let path = interfaceInfo.path.replace(reg, '');
              let method = interfaceInfo.method.toLowerCase();
              let arr = path.split('/');
              console.log(arr, 'arr');
              // 以接口全路径生成请求函数名
              const regMatchRes = interfaceInfo.path.match(reg);
              const name = regMatchRes ? regMatchRes[1] : 'api';
              return changeCase.camelCase(`${name} ${arr.join(' ')} ${method}`);
              // 若生成的请求函数名存在语法关键词报错、或想通过某个关键词触发 IDE 自动引入提示，可考虑加前缀，如:
              // return changeCase.camelCase(`api_${interfaceInfo.path}`)

              // 若生成的请求函数名有重复报错，可考虑将接口请求方式纳入生成条件，如:
              // return changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.path}`)
            },
          },
        ],
      },
    ],
  },
]);
