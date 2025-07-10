import { createModel } from '@rematch/core';

import I18N from '@/utils/I18N';

import type { RootModel } from '.';

interface UserInfo {
  name: string;
}

export const user = createModel<RootModel>()({
  state: {
    userInfo: { name: I18N.auto.zhangSan } as UserInfo,
  },
  reducers: {
    setUser(state, payload: UserInfo) {
      return { ...state, userInfo: payload };
    },
  },
  effects: (dispatch) => ({
    async getUser() {
      return new Promise<UserInfo>((resolve) => {
        setTimeout(() => {
          resolve({ name: I18N.auto.liSi });
        }, 50);
      }).then((data) => {
        dispatch.user.setUser(data);
      });
    },
  }),
});
