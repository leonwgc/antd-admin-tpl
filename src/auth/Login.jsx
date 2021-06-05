import React, { useState, useEffect, useRef } from 'react';
import { Input, Form, Tabs, Button, message } from 'antd';
import useCountdown from '~/hooks/useCountdown';
import { isValidPhone } from '~/utils/helper';
import FormRender from 'antd-form-render';
import { get } from '~/utils/fetch-xx';
import './Login.less';
import { useForm } from 'antd/es/form/Form';

const { TabPane } = Tabs;
const defaultCountdown = 5;

export default function Login({ history }) {
  const [nameForm] = useForm();
  const [telForm] = useForm();
  const ref = useRef(null);

  const [data, setData] = useState({
    tel: '',
    code: '',
    name: '',
    pwd: '',
  });

  //#region  nameForm
  const nameFormLayout = [
    {
      type: Input,
      label: '',
      placeholder: '请输入账号',
      name: 'name',
      elProps: {},
      itemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
    {
      type: Input.Password,
      label: '',
      placeholder: '请输入密码',
      name: 'pwd',
      elProps: {},
      itemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
    {
      render() {
        return (
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        );
      },
    },
  ];

  const onNameFormFinish = (values) => {
    console.log(values);
    history.push('/biz/customer-list');
  };
  //#endregion

  //#region  tel form

  const { countdown, started, start, stop } = useCountdown({
    defaultCountdown,
  });

  const show = () => {
    const { tel } = data;
    if (isValidPhone(tel)) {
    } else {
      message.error('请输入正确的手机号码');
    }
  };

  const telFormLayout = [
    {
      type: Input,
      label: '',
      placeholder: '请输手机号',
      name: 'tel',
      elProps: {
        maxLength: 11,
      },
      itemProps: {
        validateTrigger: 'onBlur',
        rules: [
          { required: true, message: '请输入' },
          { pattern: /^1\d{10}$/, message: '手机号必须为11位数字' },
        ],
      },
    },
    {
      type: Input,
      label: '',
      placeholder: '请输入验证码',
      name: 'code',
      elProps: {
        maxLength: 4,
        suffix: (
          <span className="getcode" type="link" ref={ref} onClick={started ? null : show}>
            {started ? countdown + '秒' : '获取验证码'}
          </span>
        ),
      },
      itemProps: {
        rules: [
          { required: true, message: '请输入' },
          { pattern: /^\d{4}$/, message: '格式错误' },
        ],
      },
    },
    {
      render() {
        return (
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        );
      },
    },
  ];

  const onTelFormFinish = (values) => {
    console.log(values);
    history.push('/biz/customer-list');
  };

  //#endregion tel form

  const onValuesChange = (v) => {
    setData((p) => ({ ...p, ...v }));
  };

  return (
    <div className="page-login">
      <Tabs defaultActiveKey="1">
        <TabPane tab="账号密码登陆" key="1">
          <Form form={nameForm} onValuesChange={onValuesChange} onFinish={onNameFormFinish}>
            <FormRender layoutData={nameFormLayout} />
          </Form>
        </TabPane>
        <TabPane tab="验证码登陆" key="2">
          <Form form={telForm} onValuesChange={onValuesChange} onFinish={onTelFormFinish}>
            <FormRender layoutData={telFormLayout} />
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}
