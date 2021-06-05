import React, { useState, useEffect } from 'react';
import { Result, Button } from 'antd';

export default function Page403({ history }) {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/biz');
          }}
        >
          Back
        </Button>
      }
    />
  );
}
