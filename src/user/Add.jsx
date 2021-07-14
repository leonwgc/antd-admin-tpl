/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import FormRender from 'antd-form-render';
import { Form, Button, Space, Input, Steps, Card, InputNumber } from 'antd';

const { Step } = Steps;

const defaultBank = {
  name: '',
  code: '',
};

export default function Add() {
  const [data, setData] = useState({
    companyName: 'name',
    taxNumber: '123',
    banks: [{ ...defaultBank }],
    rate1: 0.1,
    rate2: 0.2,
  });

  const { banks = [] } = data;
  // baseform
  const [form] = Form.useForm();

  // rate form
  const [rateForm] = Form.useForm();

  // bank form
  const [bankForm] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    rateForm.resetFields();
    bankForm.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // base layout
  const layout = [
    {
      type: Input,
      label: '企业名称',
      placeholder: '请填写客户企业名称',
      name: 'companyName',
      elProps: {
        maxLength: 30,
      },
      itemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
    {
      type: Input,
      label: '税号',
      placeholder: '请填写企业税号',
      name: 'taxNumber',
      itemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
    {
      type: Input,
      label: '联系人姓名',
      placeholder: '请填写客户联系人姓名',
      name: 'contactName',
    },
    {
      type: Input,
      label: '联系人电话',
      placeholder: '请填写客户联系人电话',
      name: 'contactNumber',
      itemProps: {
        rules: [{ pattern: /^1\d{10}$/, message: '手机号必须为11位数字' }],
      },
    },
    {
      type: Input,
      label: '联系人邮箱',
      placeholder: '请填写客户联系人邮箱',
      name: 'contactEmail',
      itemProps: {
        rules: [
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式错误' },
        ],
      },
    },
    {
      type: Input,
      label: '企业法人',
      placeholder: '请填写客户企业法人',
      name: 'legalPerson',
    },

    {
      type: Input,
      label: '企业性质',
      placeholder: '请选择企业性质',
      name: 'companyProperty',
    },

    {
      type: Input,
      label: '所属行业',
      placeholder: '如：金融、互联网、人工智能...',
      name: 'industry',
    },
    {
      type: Input,
      label: '企业地址',
      placeholder: '请填写客户企业地址',
      name: 'address',
    },
    {
      type: Input,
      label: '企业固话',
      placeholder: '请填写客户企业固话',
      name: 'telephone',
    },
  ];

  // rate layout
  const rateLayout = [
    {
      type: InputNumber,
      name: 'rate1',
      label: '直客模式费率（含税）',
      elProps: {
        precision: 2,
        step: 0.1,
        min: 0,
        max: 1,
      },
    },
    {
      render() {
        return <div style={{ display: 'inline-block', verticalAlign: -5 }}>不填写默认0.00%</div>;
      },
    },
    {
      type: InputNumber,
      name: 'rate2',
      label: '直客模式费率（含税）',
      elProps: {
        precision: 2,
        step: 0.1,
        min: 0,
        max: 1,
      },
    },
    {
      render() {
        return <div style={{ display: 'inline-block', verticalAlign: -5 }}>不填写默认0.00%</div>;
      },
    },
  ];

  // bank layout [][]
  const bankLayout = [];

  banks.map((item, index) => {
    bankLayout.push(
      [
        {
          render() {
            return (
              <div style={{ marginBottom: 30 }}>
                <span>银行账户{index + 1}</span>
                {index > 0 ? (
                  <a
                    style={{ marginLeft: 30 }}
                    onClick={() => {
                      // sync form data
                      let v = bankForm.getFieldsValue();
                      v.banks.splice(index, 1);
                      bankForm.setFieldsValue(v);
                      banks.splice(index, 1);
                      setData((p) => ({ ...p, banks: [...banks] }));
                    }}
                  >
                    删除账户
                  </a>
                ) : null}
              </div>
            );
          },
        },
      ],
      [
        {
          type: Input,
          name: [`banks`, index, 'name'],
          elProps: {
            placeholder: '请填写开户银行',
          },
        },

        {
          type: Input,
          name: ['banks', index, 'code'],
          elProps: {
            placeholder: '请输入银行账号',
          },
        },
      ]
    );
  });

  return (
    <div className="form-page">
      <div style={{ margin: '20px 0 50px' }}>
        <Steps current={0} size="small">
          <Step title="第一步" description="填写客户基本信息" />
          <Step title="第二步" description="添加管理员账号" />
          <Step title="完成" />
        </Steps>
      </div>

      <Card title="基本信息">
        <Form form={form} initialValues={data}>
          <FormRender layoutData={layout} cols={2} />
        </Form>
      </Card>

      <Card title="合作价格" style={{ marginTop: 30, width: 580 }}>
        <Form form={rateForm} initialValues={data}>
          <FormRender layoutData={rateLayout} cols={2} />
        </Form>
      </Card>

      <Card title="财务信息" style={{ marginTop: 30 }}>
        <Form form={bankForm} initialValues={data}>
          <FormRender layoutData={bankLayout} />
          <Button
            onClick={() => {
              banks.push(defaultBank);
              setData((p) => ({ ...p, banks: [...banks] }));
            }}
          >
            + 添加银行账户
          </Button>
        </Form>
      </Card>

      <Card title="企业资料" style={{ marginTop: 30 }}>
        todo
      </Card>

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <Space>
          <Button>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              Promise.all([
                form.validateFields(),
                rateForm.validateFields(),
                bankForm.validateFields(),
              ])
                .then(([base, rate, bank]) => {
                  console.log(base, rate, bank);
                })
                .catch((ex) => {
                  console.log(ex);
                });
            }}
          >
            下一步
          </Button>
        </Space>
      </div>
    </div>
  );
}
