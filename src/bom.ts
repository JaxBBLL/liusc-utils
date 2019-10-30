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
