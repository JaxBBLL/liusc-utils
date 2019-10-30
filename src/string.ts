import { AnyObjInter } from "./interface";
import { type } from "./util";

const proto = String.prototype;

export function trimLeft(str: string) {
  if (proto.trimLeft) {
    return str.trimLeft();
  } else {
    return str.replace(/^\s+/, "");
  }
}

export function trimRight(str: string) {
  if (proto.trimRight) {
    return str.trimRight();
  } else {
    return str.replace(/\s+$/, "");
  }
}

export function qsParse(
  url: string,
  sep = "&",
  eq = "=",
  decode = decodeURIComponent
) {
  const reg = new RegExp(
    "([^" + sep + "?" + eq + "]+)=([^" + sep + "?" + eq + "]+)",
    "g"
  );
  const ret: any = {};
  url.replace(reg, function(): any {
    ret[decode(arguments[1])] = decode(arguments[2]);
  });
  return ret;
}

export function qsStringify(
  obj: AnyObjInter,
  sep = "&",
  eq = "=",
  encode = encodeURIComponent
) {
  const ret: string[] = [];
  for (let k in obj) {
    if (type(obj[k]) === "Array") {
      ret.push(...stringifyArr(k, obj[k]));
    } else if (
      type(obj[k]) === "String" ||
      type(obj[k]) === "Number" ||
      type(obj[k]) === "Boolean"
    ) {
      ret.push(encode(k) + eq + encode(obj[k]));
    } else {
      ret.push(encode(k) + eq + "");
    }
  }
  return ret.join(sep);

  function stringifyArr(key: string, arr: Array<any>) {
    let ret: string[] = [];
    arr.forEach(item => {
      ret.push(encode(key) + eq + encode(item));
    });
    return ret;
  }
}
