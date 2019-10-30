const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const camelCase = function(name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
};

export function qsa(selector: string, scope?: HTMLElement | Document) {
  var type = selector.substring(0, 1);
  if (type === "#") {
    return document.getElementById(selector.substring(1));
  } else {
    return (scope || document).querySelectorAll(selector);
  }
}

/* 检测类名 */
export function hasClass(ele: HTMLElement, name: string) {
  return ele.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)"));
}

/* 添加类名 */
export function addClass(ele: HTMLElement, name: string) {
  if (!hasClass(ele, name)) ele.className += " " + name;
}

/* 删除类名 */
export function removeClass(ele: HTMLElement, name: string) {
  if (hasClass(ele, name)) {
    var reg = new RegExp("(\\s|^)" + name + "(\\s|$)");
    ele.className = ele.className.replace(reg, "");
  }
}

/* 替换类名 */
export function replaceClass(
  ele: HTMLElement,
  newName: string,
  oldName: string
) {
  removeClass(ele, oldName);
  addClass(ele, newName);
}

/* 获取兄弟节点 */
export function siblings(ele: HTMLElement) {
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
export function getStyle(element: HTMLElement, name: any) {
  return getComputedStyle(element, null)[name];
}

export function setStyle(element: HTMLElement, styleName: any, value: any) {
  if (!element || !styleName) return;

  if (typeof styleName === "object") {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    element.style[styleName] = value;
  }
}

export const index = function(el: HTMLElement | Document) {
  if (!el.parentNode) {
    return 0;
  }
  return Array.prototype.indexOf.call(el.parentNode.children, el);
};
