import classNames from 'classnames';
import React from 'react';

import s from './index.less';
export type Props = {
  type?: 'search' | 'noData';
  text?: string;
  content?: string;
  className?: string;
  imgClassName?: string;
  textClassName?: string;
  descClassName?: string;
  showText?: boolean;
};
export default function Empty(props: Props) {
  const {
    type = 'noData',
    text,
    content,
    className,
    imgClassName,
    textClassName,
    descClassName,
    showText = true,
  } = props;
  return (
    <div className={classNames(s.empty, className)}>
      <img className={classNames(s.img, imgClassName)}></img>
      {showText && <div className={classNames(s.text, textClassName)}>{text}</div>}
      <div className={classNames(s.desc, descClassName)}>{content}</div>
    </div>
  );
}
