import { AnyObjInter } from "./interface";

export function type(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

export function merge(target: any, ...obj: any) {
  for (let i = 0, j = obj.length; i < j; i++) {
    let source = obj[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}

export function debounce(func: Function, wait: number) {
  var timeout: number;
  return function(this: any) {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

export function throttle(action: Function, delay: number) {
  var statTime = 0;
  return function(this: any) {
    var currTime = +new Date();
    if (currTime - statTime > delay) {
      action.apply(this, arguments);
      statTime = currTime;
    }
  };
}

export const deepClone = function(values: any) {
  var copy: AnyObjInter;
  // Handle the 3 simple types, and null or undefined
  if (null == values || "object" != typeof values) return values;
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
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy values! Its type isn't supported.");
};
