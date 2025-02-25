import { useMount } from 'ahooks';
import { Outlet } from 'umi';

import styles from './index.less';

const Layout: React.FC<any> = () => {
  const setFontSizeFactor = () => {
    const size = 1;
    document.documentElement.style.fontSize = `${size * 100}px`;
  };
  useMount(() => {
    setFontSizeFactor();
  });
  return (
    <div className={styles.navs}>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
