import React from 'react';
import QKMicroAppRender from 'simple-react-qiankun';

const App = () => {
  return (
    <QKMicroAppRender
      app={{
        entry: '//localhost:3002/pc.html#/afr',
      }}
    />
  );
};

export default App;
