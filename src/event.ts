import { qsa } from "./dom";

export function on(
  element: HTMLElement | Document,
  event: string,
  handler: any,
  useCapture?: boolean
) {
  if (element && event && handler) {
    element.addEventListener(event, handler, !!useCapture);
  }
}

export function delegate(
  target: HTMLElement | Document,
  selector: string,
  event: string,
  handler: any
) {
  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
  var useCapture = event === "blur" || event === "focus";
  on(target, event, dispatchEvent, useCapture);

  function dispatchEvent(event: Event) {
    var targetElement = event.target;
    var potentialElements = qsa(selector, target);
    var hasMatch =
      Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

    if (hasMatch) {
      handler.call(targetElement, event);
    }
  }
}

export function off(
  element: HTMLElement | Document,
  event: string,
  handler: any
) {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
}

export function once(el: HTMLElement | Document, event: string, fn: Function) {
  var listener = function() {
    if (fn) {
      fn.apply(null, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
}

export function outclick(el: HTMLElement | Document, fn: Function) {
  on(document, "click", function() {
    fn && fn.apply(null, arguments);
  });
  on(el, "click", function(ev: Event) {
    ev.stopPropagation();
  });
}
