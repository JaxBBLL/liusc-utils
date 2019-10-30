export const REG_PHONE = /^1[3|4|5|6|7|8][0-9]{9}$/;
export const REG_TEL = /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/;
export const REG_CARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export const REG_POSTAL = /[1-9]\d{5}(?!\d)/;
export const REG_QQ = /^[1-9][0-9]{4,9}$/;
export const REG_EMAIL = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
export const REG_MONEY = /^\d*(?:\.\d{0,2})?$/;
export const REG_URL = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
export const REG_IP = /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/;
export const REG_NUMBER = /^[0-9]$/;
export const REG_ENGLISH = /^[a-zA-Z]+$/;
export const REG_CHINESE = /^[\u4E00-\u9FA5]+$/;
export const REG_LOWER = /^[a-z]+$/;
export const REG_UPPER = /^[A-Z]+$/;
export const REG_HTML = /<("[^"]*"|'[^']*'|[^'">])*>/;

export function stringIs(str: string, type: string) {
  switch (type) {
    case "phone": //手机号码
      return REG_PHONE.test(str);
    case "tel": //座机
      return REG_TEL.test(str);
    case "card": //身份证
      return REG_CARD.test(str);
    case "postal": //邮政编码
      return REG_POSTAL.test(str);
    case "QQ": //QQ号
      return REG_QQ.test(str);
    case "email": //邮箱
      return REG_EMAIL.test(str);
    case "money": //金额(小数点2位)
      return REG_MONEY.test(str);
    case "URL": //网址
      return REG_URL.test(str);
    case "IP": //IP
      return REG_IP.test(str);
    case "date": //日期时间
      return (
        /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
          str
        ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      );
    case "number": //数字
      return REG_NUMBER.test(str);
    case "english": //英文
      return REG_ENGLISH.test(str);
    case "chinese": //中文
      return REG_CHINESE.test(str);
    case "lower": //小写
      return REG_LOWER.test(str);
    case "upper": //大写
      return REG_UPPER.test(str);
    case "HTML": //HTML标记
      return REG_HTML.test(str);
    default:
      return true;
  }
}
