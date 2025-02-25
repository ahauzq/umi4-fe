import './styles/index.less';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/models/store';
import Const from '@/utils/const';

import { CorlorMode, setThemeConf } from './utils/platform';

if (process.env.UMI_ENV !== Const.PROD) {
  //
}

setThemeConf(CorlorMode.dark);

export const rootContainer = (container: ReactNode) => (
  <Provider store={store}>{container}</Provider>
);

// export const render = (oldRender: any): void => {
// 	if (process.env.NODE_ENV === 'development') {
// 		API.hub.login.testLogin
// 			.request({ uid: 'zhouqing01@corp.netease.com' })
// 			.then(oldRender)
// 			.catch(oldRender);
// 	} else {
// 		oldRender();
// 	}
// };
