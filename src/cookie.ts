import { type } from "./util";

export function setCookie(name: string, value: string | number, day: number) {
  var setting = arguments[0];
  if (type(setting) === "Object") {
    for (var i in setting) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = i + "=" + setting[i] + ";expires=" + oDate;
    }
  } else {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + oDate;
  }
}

export function getCookie(name: string) {
  var arr = document.cookie.split("; ");
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("=");
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return "";
}

export function removeCookie(name: string) {
  setCookie(name, 1, -1);
}
