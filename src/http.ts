import { JsonpInter, AjaxInter, AnyObjInter } from "./interface";
import { qsStringify } from "./string";
import { type } from "./util";

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
export function jsonp(options: JsonpInter) {
  let url = options.url;
  let data: any = options.data;
  let oBody = document.getElementsByTagName("body")[0];
  let oScript = document.createElement("script");

  let callbackName: string = "cb" + (~~(Math.random() * 0xffffff)).toString(16);
  let win: any = window;
  win[callbackName] = function(result: any) {
    options.success(result);
  };
  data[options.callback] = callbackName;
  oScript.setAttribute("src", url + "?" + format(data));
  oBody.append(oScript);

  function format(data: any) {
    let str = "";
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

export function ajax(setting: AjaxInter) {
  let {
    method = "GET",
    url = "",
    async = true,
    responseType = "json", // 解析方式
    params = "", // url参数
    data = "", // body参数
    contentType = "application/x-www-form-urlencoded",
    success = function() {},
    error = function() {},
    withCredentials = false
  } = setting;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = withCredentials;
  if (type(params) === "Object") {
    url = url + "?" + qsStringify(<object>params);
  } else if (params) {
    url = url + "?" + params;
  }
  if (method.toUpperCase() == "GET") {
    xhr.open(method, url, async);
    xhr.send();
  } else {
    xhr.open(method, url, async);
    xhr.setRequestHeader("Content-Type", contentType);
    if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
      xhr.send(qsStringify(<object>data));
    } else if (contentType.indexOf("application/json") > -1) {
      xhr.send(JSON.stringify(data));
    }
  }
  xhr.onreadystatechange = function() {
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
  xhr.onerror = function(err) {
    error(err);
  };
}
