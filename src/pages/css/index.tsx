import classNames from 'classnames';

import s from './index.less';

const HomePage: React.FC = () => {
  return (
    <div className="page">
      <div className="doc-h1">felx</div>
      <div className={s.box}>
        <div className={s.card}></div>
        <div className={classNames(s.card, s.cardwidth2)}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
      </div>
      <div className="doc-h1">flex-wrap: wrap</div>
      <div className={classNames(s.box, s.warp)}>
        <div className={s.card}></div>
        <div className={classNames(s.card, s.cardwidth2)}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
        <div className={s.card}></div>
      </div>
    </div>
  );
};
export default HomePage;
