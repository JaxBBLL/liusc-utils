/*!
 * liusc-utils.js v1.0.4
 * (c) 2019-2019 JaxBBLL
 * Released under the MIT License.
 */
'use strict';

function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}
function merge(target) {
    var arguments$1 = arguments;

    var obj = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        obj[_i - 1] = arguments$1[_i];
    }
    for (var i = 0, j = obj.length; i < j; i++) {
        var source = obj[i] || {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
}
function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}
function throttle(action, delay) {
    var statTime = 0;
    return function () {
        var currTime = +new Date();
        if (currTime - statTime > delay) {
            action.apply(this, arguments);
            statTime = currTime;
        }
    };
}
var deepClone = function (values) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == values || "object" != typeof values)
        { return values; }
    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }
    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }
    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr))
                { copy[attr] = deepClone(values[attr]); }
        }
        return copy;
    }
    throw new Error("Unable to copy values! Its type isn't supported.");
};

var proto = String.prototype;
function trimLeft(str) {
    if (proto.trimLeft) {
        return str.trimLeft();
    }
    else {
        return str.replace(/^\s+/, "");
    }
}
function trimRight(str) {
    if (proto.trimRight) {
        return str.trimRight();
    }
    else {
        return str.replace(/\s+$/, "");
    }
}
function qsParse(url, sep, eq, decode) {
    if (sep === void 0) { sep = "&"; }
    if (eq === void 0) { eq = "="; }
    if (decode === void 0) { decode = decodeURIComponent; }
    var reg = new RegExp("([^" + sep + "?" + eq + "]+)=([^" + sep + "?" + eq + "]+)", "g");
    var ret = {};
    url.replace(reg, function () {
        ret[decode(arguments[1])] = decode(arguments[2]);
    });
    return ret;
}
function qsStringify(obj, sep, eq, encode) {
    if (sep === void 0) { sep = "&"; }
    if (eq === void 0) { eq = "="; }
    if (encode === void 0) { encode = encodeURIComponent; }
    var ret = [];
    for (var k in obj) {
        if (type(obj[k]) === "Array") {
            ret.push.apply(ret, stringifyArr(k, obj[k]));
        }
        else if (type(obj[k]) === "String" ||
            type(obj[k]) === "Number" ||
            type(obj[k]) === "Boolean") {
            ret.push(encode(k) + eq + encode(obj[k]));
        }
        else {
            ret.push(encode(k) + eq + "");
        }
    }
    return ret.join(sep);
    function stringifyArr(key, arr) {
        var ret = [];
        arr.forEach(function (item) {
            ret.push(encode(key) + eq + encode(item));
        });
        return ret;
    }
}

var REG_PHONE = /^1[3|4|5|6|7|8][0-9]{9}$/;
var REG_TEL = /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/;
var REG_CARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var REG_POSTAL = /[1-9]\d{5}(?!\d)/;
var REG_QQ = /^[1-9][0-9]{4,9}$/;
var REG_EMAIL = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
var REG_MONEY = /^\d*(?:\.\d{0,2})?$/;
var REG_URL = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
var REG_IP = /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/;
var REG_NUMBER = /^[0-9]$/;
var REG_ENGLISH = /^[a-zA-Z]+$/;
var REG_CHINESE = /^[\u4E00-\u9FA5]+$/;
var REG_LOWER = /^[a-z]+$/;
var REG_UPPER = /^[A-Z]+$/;
var REG_HTML = /<("[^"]*"|'[^']*'|[^'">])*>/;
function stringIs(str, type) {
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
            return (/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str));
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

var dateFormat = function (date, fmt) {
    if (fmt === void 0) { fmt = "YYYY-MM-DD HH:mm:ss"; }
    if (!date) {
        return "";
    }
    if (typeof date === "string") {
        date = new Date(date.replace(/-/g, "/"));
    }
    if (typeof date === "number") {
        date = new Date(date);
    }
    var o = {
        "M+": date.getMonth() + 1,
        "D+": date.getDate(),
        "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    var week = [
        "\u65e5",
        "\u4e00",
        "\u4e8c",
        "\u4e09",
        "\u56db",
        "\u4e94",
        "\u516d"
    ];
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1
            ? RegExp.$1.length > 2
                ? "\u661f\u671f"
                : "\u5468"
            : "") + week[date.getDay()]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var camelCase = function (name) {
    return name
        .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    })
        .replace(MOZ_HACK_REGEXP, "Moz$1");
};
function qsa(selector, scope) {
    var type = selector.substring(0, 1);
    if (type === "#") {
        return document.getElementById(selector.substring(1));
    }
    else {
        return (scope || document).querySelectorAll(selector);
    }
}
/* 检测类名 */
function hasClass(ele, name) {
    return ele.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)"));
}
/* 添加类名 */
function addClass(ele, name) {
    if (!hasClass(ele, name))
        { ele.className += " " + name; }
}
/* 删除类名 */
function removeClass(ele, name) {
    if (hasClass(ele, name)) {
        var reg = new RegExp("(\\s|^)" + name + "(\\s|$)");
        ele.className = ele.className.replace(reg, "");
    }
}
/* 替换类名 */
function replaceClass(ele, newName, oldName) {
    removeClass(ele, oldName);
    addClass(ele, newName);
}
/* 获取兄弟节点 */
function siblings(ele) {
    if (!ele.parentNode) {
        return null;
    }
    var chid = ele.parentNode.children;
    var eleMatch = [];
    for (var i = 0, len = chid.length; i < len; i++) {
        if (chid[i] != ele) {
            eleMatch.push(chid[i]);
        }
    }
    return eleMatch;
}
/* 获取行间样式属性 */
function getStyle(element, name) {
    return getComputedStyle(element, null)[name];
}
function setStyle(element, styleName, value) {
    if (!element || !styleName)
        { return; }
    if (typeof styleName === "object") {
        for (var prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    }
    else {
        styleName = camelCase(styleName);
        element.style[styleName] = value;
    }
}
var index = function (el) {
    if (!el.parentNode) {
        return 0;
    }
    return Array.prototype.indexOf.call(el.parentNode.children, el);
};

var scrollTo = function (position) {
    if (position === void 0) { position = 0; }
    var win = window;
    if (!win.requestAnimationFrame) {
        win.requestAnimationFrame = function (callback) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            win.scrollTo(0, position);
        }
        else {
            win.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};
/**
 * @desc  获取一个元素的距离文档(document)的位置
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
var offset = function (ele) {
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return pos;
};

function on(element, event, handler, useCapture) {
    if (element && event && handler) {
        element.addEventListener(event, handler, !!useCapture);
    }
}
function delegate(target, selector, event, handler) {
    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    var useCapture = event === "blur" || event === "focus";
    on(target, event, dispatchEvent, useCapture);
    function dispatchEvent(event) {
        var targetElement = event.target;
        var potentialElements = qsa(selector, target);
        var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
        if (hasMatch) {
            handler.call(targetElement, event);
        }
    }
}
function off(element, event, handler) {
    if (element && event) {
        element.removeEventListener(event, handler, false);
    }
}
function once(el, event, fn) {
    var listener = function () {
        if (fn) {
            fn.apply(null, arguments);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
}
function outclick(el, fn) {
    on(document, "click", function () {
        fn && fn.apply(null, arguments);
    });
    on(el, "click", function (ev) {
        ev.stopPropagation();
    });
}

function setCookie(name, value, day) {
    var setting = arguments[0];
    if (type(setting) === "Object") {
        for (var i in setting) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + day);
            document.cookie = i + "=" + setting[i] + ";expires=" + oDate;
        }
    }
    else {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = name + "=" + value + ";expires=" + oDate;
    }
}
function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}
function removeCookie(name) {
    setCookie(name, 1, -1);
}

/**
  jsonp({
      url: 'https://s.taobao.com/api',
      data: {
          m: 'customized',
          _input_charset: 'utf-8',
          suggest_query: 'f',
          q: this.word
      },
      callback: 'callback',
      success: data => {
          this.result = data['API.CustomizedApi'].itemlist.auctions
          console.log(data['API.CustomizedApi'].itemlist.auctions)
      }
  });
 */
function jsonp(options) {
    var url = options.url;
    var data = options.data;
    var oBody = document.getElementsByTagName("body")[0];
    var oScript = document.createElement("script");
    var callbackName = "cb" + (~~(Math.random() * 0xffffff)).toString(16);
    var win = window;
    win[callbackName] = function (result) {
        options.success(result);
    };
    data[options.callback] = callbackName;
    oScript.setAttribute("src", url + "?" + format(data));
    oBody.append(oScript);
    function format(data) {
        var str = "";
        for (var p in data) {
            str += encodeURIComponent(p) + "=" + encodeURIComponent(data[p]) + "&";
        }
        return str.slice(0, -1);
    }
}
/**
  ajax({
    method: 'GET',
    url: 'http://demo.com/api',
    params: {}, // url参数
    data: {}, // body参数
    responseType: 'json', // 解析方式
    success: function(data) {},
    error: function(err) {},
    contentType:"application/x-www-form-urlencoded",
    withCredentials: false
  })
*/
function ajax(setting) {
    var _a = setting.method, method = _a === void 0 ? "GET" : _a, _b = setting.url, url = _b === void 0 ? "" : _b, _c = setting.async, async = _c === void 0 ? true : _c, _d = setting.responseType, responseType = _d === void 0 ? "json" : _d, // 解析方式
    _e = setting.params, // 解析方式
    params = _e === void 0 ? "" : _e, // url参数
    _f = setting.data, // url参数
    data = _f === void 0 ? "" : _f, // body参数
    _g = setting.contentType, // body参数
    contentType = _g === void 0 ? "application/x-www-form-urlencoded" : _g, _h = setting.success, success = _h === void 0 ? function () { } : _h, _j = setting.error, error = _j === void 0 ? function () { } : _j, _k = setting.withCredentials, withCredentials = _k === void 0 ? false : _k;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = withCredentials;
    if (type(params) === "Object") {
        url = url + "?" + qsStringify(params);
    }
    else if (params) {
        url = url + "?" + params;
    }
    if (method.toUpperCase() == "GET") {
        xhr.open(method, url, async);
        xhr.send();
    }
    else {
        xhr.open(method, url, async);
        xhr.setRequestHeader("Content-Type", contentType);
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
            xhr.send(qsStringify(data));
        }
        else if (contentType.indexOf("application/json") > -1) {
            xhr.send(JSON.stringify(data));
        }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
            switch (responseType) {
                case "json":
                    var json = JSON.parse(xhr.responseText);
                    success(json);
                    break;
                case "xml":
                    success(xhr.responseXML);
                    break;
                default:
                    success(xhr.responseText);
                    break;
            }
        }
    };
    xhr.onerror = function (err) {
        error(err);
    };
}

var device = function () {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
    var ua = navigator.userAgent.toLowerCase();
    var testUa = function (regexp) { return regexp.test(ua); };
    var testVs = function (regexp) {
        return (ua.match(regexp) + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
    };
    // 系统
    var system = "unknown";
    if (testUa(/windows|win32|win64|wow32|wow64/gi)) {
        system = "windows"; // window系统
    }
    else if (testUa(/macintosh|macintel/gi)) {
        system = "osx"; // osx系统
    }
    else if (testUa(/x11/gi)) {
        system = "linux"; // linux系统
    }
    else if (testUa(/android|adr/gi)) {
        system = "android"; // android系统
    }
    else if (testUa(/ios|iphone|ipad|ipod|iwatch/gi)) {
        system = "ios"; // ios系统
    }
    // 系统版本
    var systemVs = "unknown";
    if (system === "windows") {
        if (testUa(/windows nt 5.0|windows 2000/gi)) {
            systemVs = "2000";
        }
        else if (testUa(/windows nt 5.1|windows xp/gi)) {
            systemVs = "xp";
        }
        else if (testUa(/windows nt 5.2|windows 2003/gi)) {
            systemVs = "2003";
        }
        else if (testUa(/windows nt 6.0|windows vista/gi)) {
            systemVs = "vista";
        }
        else if (testUa(/windows nt 6.1|windows 7/gi)) {
            systemVs = "7";
        }
        else if (testUa(/windows nt 6.2|windows 8/gi)) {
            systemVs = "8";
        }
        else if (testUa(/windows nt 6.3|windows 8.1/gi)) {
            systemVs = "8.1";
        }
        else if (testUa(/windows nt 10.0|windows 10/gi)) {
            systemVs = "10";
        }
    }
    else if (system === "osx") {
        systemVs = testVs(/os x [\d._]+/gi);
    }
    else if (system === "android") {
        systemVs = testVs(/android [\d._]+/gi);
    }
    else if (system === "ios") {
        systemVs = testVs(/os [\d._]+/gi);
    }
    // 平台
    var platform = "unknow";
    if (system === "windows" || system === "osx" || system === "linux") {
        platform = "desktop"; // 桌面端
    }
    else if (system === "android" || system === "ios" || testUa(/mobile/gi)) {
        platform = "mobile"; // 移动端
    }
    // 内核和载体
    var engine = "unknow";
    var supporter = "unknow";
    if (testUa(/applewebkit/gi) && testUa(/safari/gi)) {
        engine = "webkit"; // webkit内核
        if (testUa(/edge/gi)) {
            supporter = "edge"; // edge浏览器
        }
        else if (testUa(/opr/gi)) {
            supporter = "opera"; // opera浏览器
        }
        else if (testUa(/chrome/gi)) {
            supporter = "chrome"; // chrome浏览器
        }
        else {
            supporter = "safari"; // safari浏览器
        }
    }
    else if (testUa(/gecko/gi) && testUa(/firefox/gi)) {
        engine = "gecko"; // gecko内核
        supporter = "firefox"; // firefox浏览器
    }
    else if (testUa(/presto/gi)) {
        engine = "presto"; // presto内核
        supporter = "opera"; // opera浏览器
    }
    else if (testUa(/trident|compatible|msie/gi)) {
        engine = "trident"; // trident内核
        supporter = "iexplore"; // iexplore浏览器
    }
    // 内核版本
    var engineVs = "unknow";
    if (engine === "webkit") {
        engineVs = testVs(/applewebkit\/[\d.]+/gi);
    }
    else if (engine === "gecko") {
        engineVs = testVs(/gecko\/[\d.]+/gi);
    }
    else if (engine === "presto") {
        engineVs = testVs(/presto\/[\d.]+/gi);
    }
    else if (engine === "trident") {
        engineVs = testVs(/trident\/[\d.]+/gi);
    }
    // 载体版本
    var supporterVs = "unknow";
    if (supporter === "chrome") {
        supporterVs = testVs(/chrome\/[\d.]+/gi);
    }
    else if (supporter === "safari") {
        supporterVs = testVs(/version\/[\d.]+/gi);
    }
    else if (supporter === "firefox") {
        supporterVs = testVs(/firefox\/[\d.]+/gi);
    }
    else if (supporter === "opera") {
        supporterVs = testVs(/opr\/[\d.]+/gi);
    }
    else if (supporter === "iexplore") {
        supporterVs = testVs(/(msie [\d.]+)|(rv:[\d.]+)/gi);
    }
    else if (supporter === "edge") {
        supporterVs = testVs(/edge\/[\d.]+/gi);
    }
    // 外壳和外壳版本
    var shell = "none";
    var shellVs = "unknow";
    if (testUa(/micromessenger/gi)) {
        shell = "wechat"; // 微信浏览器
        shellVs = testVs(/micromessenger\/[\d.]+/gi);
    }
    else if (testUa(/qqbrowser/gi)) {
        shell = "qq"; // QQ浏览器
        shellVs = testVs(/qqbrowser\/[\d.]+/gi);
    }
    else if (testUa(/ubrowser/gi)) {
        shell = "uc"; // UC浏览器
        shellVs = testVs(/ubrowser\/[\d.]+/gi);
    }
    else if (testUa(/2345explorer/gi)) {
        shell = "2345"; // 2345浏览器
        shellVs = testVs(/2345explorer\/[\d.]+/gi);
    }
    else if (testUa(/metasr/gi)) {
        shell = "sougou"; // 搜狗浏览器
    }
    else if (testUa(/lbbrowser/gi)) {
        shell = "liebao"; // 猎豹浏览器
    }
    else if (testUa(/maxthon/gi)) {
        shell = "maxthon"; // 遨游浏览器
        shellVs = testVs(/maxthon\/[\d.]+/gi);
    }
    else if (testUa(/bidubrowser/gi)) {
        shell = "baidu"; // 百度浏览器
        shellVs = testVs(/bidubrowser [\d.]+/gi);
    }
    return Object.assign({
        engine: engine,
        engineVs: engineVs,
        platform: platform,
        supporter: supporter,
        supporterVs: supporterVs,
        system: system,
        systemVs: systemVs
    }, shell === "none"
        ? {}
        : {
            shell: shell,
            shellVs: shellVs
        });
};



var liusc = /*#__PURE__*/Object.freeze({
  type: type,
  merge: merge,
  debounce: debounce,
  throttle: throttle,
  deepClone: deepClone,
  trimLeft: trimLeft,
  trimRight: trimRight,
  qsParse: qsParse,
  qsStringify: qsStringify,
  REG_PHONE: REG_PHONE,
  REG_TEL: REG_TEL,
  REG_CARD: REG_CARD,
  REG_POSTAL: REG_POSTAL,
  REG_QQ: REG_QQ,
  REG_EMAIL: REG_EMAIL,
  REG_MONEY: REG_MONEY,
  REG_URL: REG_URL,
  REG_IP: REG_IP,
  REG_NUMBER: REG_NUMBER,
  REG_ENGLISH: REG_ENGLISH,
  REG_CHINESE: REG_CHINESE,
  REG_LOWER: REG_LOWER,
  REG_UPPER: REG_UPPER,
  REG_HTML: REG_HTML,
  stringIs: stringIs,
  dateFormat: dateFormat,
  qsa: qsa,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  replaceClass: replaceClass,
  siblings: siblings,
  getStyle: getStyle,
  setStyle: setStyle,
  index: index,
  scrollTo: scrollTo,
  offset: offset,
  on: on,
  delegate: delegate,
  off: off,
  once: once,
  outclick: outclick,
  setCookie: setCookie,
  getCookie: getCookie,
  removeCookie: removeCookie,
  jsonp: jsonp,
  ajax: ajax,
  device: device
});

module.exports = liusc;
