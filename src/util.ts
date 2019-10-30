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
