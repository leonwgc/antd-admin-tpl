import React from 'react';
import QKMicroAppRender from 'simple-react-qiankun';

const App = () => {
  return (
    <div>
      <QKMicroAppRender
        app={{
          name: 'micro-pc-demo',
          entry: '//localhost:3002/pc.html#/afr',
        }}
      />
    </div>
  );
};

export default App;
