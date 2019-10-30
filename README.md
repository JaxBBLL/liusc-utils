# 工具类 liusc-utils

## 安装

```
npm install liusc-utils
or
yarn add liusc-utils
```

## 使用

浏览器使用

```html
<script src="dist/liusc-utils.js"></script>
<script>
  liuscUtils.on(liuscUtils.qsa("#btn"), "click", function() {
    console.log("click");
  });
</script>
```

commonjs

```js
const utils = require("liusc-utils");
console.log(utils.dateFormat(new Date()));
```

esm

```js
import { type } from "liusc-utils";
console.log(type("string"));
```

## 属性

```js
liuscUtils.REG_PHONE;
liuscUtils.REG_TEL;
liuscUtils.REG_CARD;
liuscUtils.REG_POSTAL;
liuscUtils.REG_QQ;
liuscUtils.REG_EMAIL;
liuscUtils.REG_MONEY;
liuscUtils.REG_URL;
liuscUtils.REG_IP;
liuscUtils.REG_NUMBER;
liuscUtils.REG_ENGLISH;
liuscUtils.REG_CHINESE;
liuscUtils.REG_LOWER;
liuscUtils.REG_UPPER;
liuscUtils.REG_HTML;
```

## 方法

```js
// 查找元素
liuscUtils.qsa(selector: string, scope?: HTMLElement | Document)
// 是否有className
liuscUtils.hasClass(ele: HTMLElement, name: string)
// 添加className
liuscUtils.addClass(ele: HTMLElement, name: string)
// 添加className
liuscUtils.removeClass(ele: HTMLElement, name: string)
// 替换className
liuscUtils.replaceClass(ele: HTMLElement, newName: string, oldName: string)
// 查找兄弟元素
liuscUtils.siblings(ele: HTMLElement)
// 获取元素计算后样式
liuscUtils.getStyle(element: HTMLElement, name: any)
// 获取元素行内样式
liuscUtils.setStyle(element: HTMLElement, styleName: any, value: any)
// 获取元素行内样式
liuscUtils.setStyle(element: HTMLElement, styleName: any, value: any)
// 绑定事件
liuscUtils.on(
  element: HTMLElement | Document,
  event: string,
  handler: any,
  useCapture?: boolean
)
// 事件代理
liuscUtils.delegate(
  target: HTMLElement | Document,
  selector: string,
  event: string,
  handler: any
)
// 移除事件
liuscUtils.off(
  element: HTMLElement | Document,
  event: string,
  handler: any
)
// 绑定一次事件
liuscUtils.once(el: HTMLElement | Document, event: string, fn: Function)
// 点击元素外部
liuscUtils.outclick(el: HTMLElement | Document, fn: Function)
// 日期格式化
liuscUtils.dateFormat(date: any, fmt = "YYYY-MM-DD HH:mm:ss")
// 判断数据类型
liuscUtils.type(o: any)
// 合并对象
liuscUtils.merge(target: any, ...obj: any)
// 字符串判断
liuscUtils.stringIs(str: string, type: string)
// 防抖
liuscUtils.debounce(func: Function, wait: number)
// 节流
liuscUtils.throttle(action: Function, delay: number)
// jsonp
liuscUtils.jsonp({
  url: 'http://demo.com/api',
  data: { a: 1},
  callback: 'callback',
  success: function(data) {}
})
// ajax
ajax({
  method: 'GET',
  url: 'http://demo.com/api',
  params: {}, // url参数
  data: {}, // body参数
  responseType: 'json', // 解析方式
  contentType:"application/x-www-form-urlencoded",
  success: function(data) {},
  error: function(err) {},
  withCredentials: false
})
// 设置cookie
liuscUtils.setCookie(name: string, value: string | number, day: number)
// 获取cookie
liuscUtils.getCookie(name: string)
// 删除cookie
liuscUtils.removeCookie(name: string)
// 删除字符串左边空格
liuscUtils.trimLeft(name: string)
// 删除字符串右边空格
liuscUtils.trimRight(name: string)
// querystring parse
liuscUtils.qsParse(
  url: string,
  sep = "&",
  eq = "=",
  decode = decodeURIComponent
)
// querystring stringify
liuscUtils.qsStringify(
  obj: AnyObjInter,
  sep = "&",
  eq = "=",
  encode = encodeURIComponent
)
```
