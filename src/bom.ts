export const scrollTo = function(position: number = 0) {
  var win: any = window;
  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = function(callback: Function) {
      return setTimeout(callback, 17);
    };
  }
  // 当前滚动高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 滚动step方法
  var step = function() {
    // 距离目标滚动距离
    var distance = position - scrollTop;
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5;
    if (Math.abs(distance) < 1) {
      win.scrollTo(0, position);
    } else {
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
export const offset = function(ele: HTMLElement) {
  var pos = {
    left: 0,
    top: 0
  };
  while (ele) {
    pos.left += ele.offsetLeft;
    pos.top += ele.offsetTop;
    ele = ele.offsetParent as HTMLElement;
  }
  return pos;
};

let scrollBarWidth: number;
/**
 * 获取滚动条的宽度
 */
export const getScrollBarWidth = function() {
  if (scrollBarWidth) return scrollBarWidth;

  const outer: HTMLElement = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode && outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};
