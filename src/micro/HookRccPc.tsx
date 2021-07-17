import React, { useEffect, useRef } from 'react';
import { loadMicroApp } from 'qiankun';

const App = () => {
  const containerRef = useRef();
  const appRef = useRef(null);

  useEffect(() => {
    // 手动加载微应用
    appRef.current = loadMicroApp({
      name: 'hooks-rcc-pc',
      entry: '//localhost:3002/pc.html',
      container: containerRef.current,
      props: { brand: 'qiankun' },
    });

    if (location.hash != '/afr') {
      location.hash = '/afr';
    }

    return () => {
      appRef.current.unmount();
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default App;
