import { useEffect, useState } from 'react';
import 'intersection-observer';

// 判断元素是否可见

const getTargetElement = (target) => {
  let el = null;
  if (typeof target === 'function') {
    el = target();
  } else {
    el = target;
  }
  return el;
};

const noop = () => {};

function isInViewPort(el) {
  if (!el) {
    return false;
  }

  const viewPortWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const rect = el.getBoundingClientRect();

  if (rect) {
    const { top, bottom, left, right } = rect;
    return bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0;
  }

  return false;
}

// target 目标dom
// onChange 可见性变化时调用, 组件第一次加载时也会触发
function useInViewport(target, onChange = noop) {
  const [inViewPort, setInViewport] = useState(() => {
    const el = getTargetElement(target);

    const isVisible = isInViewPort(el);
    onChange(isVisible);
    return isVisible;
  });

  useEffect(() => {
    onChange(inViewPort);
  }, [inViewPort, onChange]);

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInViewport(true);
        } else {
          setInViewport(false);
        }
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return inViewPort;
}

export default useInViewport;
