import React from 'react';
import QKMicroAppRender from '../common/QKMicroAppRender';

const App = () => {
  return (
    <QKMicroAppRender
      app={{
        name: 'hooks-rcc-pc',
        entry: '//localhost:3002/pc.html#/afr',
      }}
    />
  );
};

export default App;
