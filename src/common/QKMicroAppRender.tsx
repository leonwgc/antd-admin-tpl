import React, { useEffect, useRef } from 'react';
import { AppMetadata, FrameworkConfiguration, loadMicroApp } from 'qiankun';

type QKMicroAppRenderProps = {
  app: AppMetadata & { [p: string]: any };
  configuration?: FrameworkConfiguration;
};

const QKMicroAppRender = ({ app, configuration }: QKMicroAppRenderProps) => {
  const containerRef = useRef();
  const appRef = useRef(null);

  useEffect(() => {
    appRef.current = loadMicroApp(
      {
        ...app,
        container: containerRef.current,
      },
      configuration
    );

    const { entry = '' } = app;
    if (typeof entry === 'string') {
      const hashIndex = entry.indexOf('#');
      if (hashIndex > -1) {
        const hash = entry.slice(hashIndex + 1);
        if (location.hash != hash) {
          location.hash = hash;
        }
      }
    }

    return () => {
      appRef.current.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef}></div>;
};

export default QKMicroAppRender;
