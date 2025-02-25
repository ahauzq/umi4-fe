import classNames from 'classnames';
import React from 'react';

import s from './index.less';
export type Props = {
  className?: string;
};
export default function Demo(props: Props) {
  const { className } = props;
  return <div className={classNames(className)}>demo</div>;
}
