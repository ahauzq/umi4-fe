import { Button } from 'antd';
import { useSelector } from 'react-redux';

import { Tooltip } from '@/components/basic';
import { RootState } from '@/models/store';
import I18N from '@/utils/I18N';

import s from './index.less';

const HomePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return (
    <div>
      <div className={s.label}>hello:</div>
      <div className={s.name}>{userInfo.name}</div>
      <Button type="primary">{I18N.common.test}</Button>
      <div>
        <Tooltip title={'测试一个比较长的文案'} onlyEllipsis>
          <div>测试一个比较长的文案</div>
        </Tooltip>
      </div>
      <div>
        <Tooltip title={'测试一个比较长的文案'} onlyEllipsis>
          <div className={s.ellipsis}>测试一个比较长的文案</div>
        </Tooltip>
      </div>
    </div>
  );
};
export default HomePage;
