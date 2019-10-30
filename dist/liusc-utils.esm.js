/*!
 * liusc-utils.js v1.0.3
 * (c) 2019-2019 JaxBBLL
 * Released under the MIT License.
 */
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
//# sourceMappingURL=util.js.map

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
//# sourceMappingURL=string.js.map

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
//# sourceMappingURL=reg.js.map

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
//# sourceMappingURL=date.js.map

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
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
    if (typeof styleName === 'object') {
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
//# sourceMappingURL=dom.js.map

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
//# sourceMappingURL=event.js.map

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
//# sourceMappingURL=cookie.js.map

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

//# sourceMappingURL=liusc.js.map

var liusc = /*#__PURE__*/Object.freeze({
  type: type,
  merge: merge,
  debounce: debounce,
  throttle: throttle,
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
  on: on,
  delegate: delegate,
  off: off,
  once: once,
  outclick: outclick,
  setCookie: setCookie,
  getCookie: getCookie,
  removeCookie: removeCookie,
  jsonp: jsonp,
  ajax: ajax
});

//# sourceMappingURL=index.js.map

export default liusc;