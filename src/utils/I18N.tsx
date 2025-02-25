import ppIntl from 'kiwi-intl';
import { Fragment, ReactNode } from 'react';

import enUsLangs from '../../.ppi18n/en-US';
import jaJPLangs from '../../.ppi18n/ja-JP';
import zhCNLangs from '../../.ppi18n/zh-CN';

export { ppIntl };

export enum LangEnum {
  zh = 'zh-CN',
  en = 'en-US',
  ja = 'ja-JP',
}

/**
 * 获取当前语言的Cookie
 */
export function getCurrentLang(): LangEnum {
  const urlLang = new URL(window.location.href).searchParams.get('lang');
  const cookieLang = (document.cookie.match(/ppIntl-locale=([^;$]+)/) || [null, LangEnum.en])[1];
  const lang = (cookieLang as string).split(' ')[0];
  if (Object.keys(LangEnum).includes(urlLang as string)) {
    return urlLang as LangEnum;
  }
  return lang as LangEnum;
}

const langs = {
  'en-US': enUsLangs,
  'zh-CN': zhCNLangs,
  'ja-JP': jaJPLangs,
};
// 从 Cookie 中取语言值, 默认为 zh-CN
const defaultLang = getCurrentLang();

const I18N = ppIntl.init(defaultLang, langs);

export function setLang(lang: LangEnum) {
  document.cookie = `ppIntl-locale=${lang}; path=/`;
  I18N.setLang && I18N.setLang(lang);
}
//@ts-ignore
I18N.templateNode = (str = '', args: Record<string, ReactNode>) => {
  const arr: ReactNode[] = [];
  str.split(/\{(\w+?)\}/).forEach((item, index) => {
    if (index % 2 !== 0) {
      if (args[item]) {
        arr.push(args[item]);
      }
    } else {
      if (item !== '') {
        arr.push(item.replace(/\s/g, '\u00A0'));
      }
    }
  });
  return arr.map((item, index) => <Fragment key={index}>{item}</Fragment>);
};

export default I18N as typeof I18N & {
  templateNode(str: string, args: Record<string, ReactNode>): ReactNode;
};
