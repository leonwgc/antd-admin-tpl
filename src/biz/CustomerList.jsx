import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, Select, message, Space, Popover, Popconfirm } from 'antd';
import { useAntdTable } from 'ahooks';
import FormRenderer from 'antd-form-render';
import usePageTitle from '~/hooks/usePageTitle';

const channel = [{ label: '人人秀', value: 'rrx' }];
const activityRange = [
  { label: '全员活动', value: 'ALL' },
  { label: '指定公司', value: 'RULE' },
];

const getTableData = ({ current = 1, pageSize = 10 }, formData = {}) => {
  return Promise.resolve({
    total: 100,
    list: [{ name: 'wgc', age: 18 }],
  });
};

export default function CustomerList({ history }) {
  usePageTitle('page title');

  const [form] = Form.useForm();
  const { tableProps, search, loading, refresh } = useAntdTable(getTableData, { form });
  const { submit, reset } = search;

  const searchLayout = [
    {
      type: Select,
      label: '审核状态',
      placeholder: '请输入',
      name: 'auditState',
      elProps: {
        options: [
          { label: '全部', value: '' },
          { label: '待审核', value: '1' },
          { label: '已通过', value: '2' },
          { label: '已驳回', value: '3' },
        ],
      },
    },
    {
      type: Input,
      label: '客户名称',
      placeholder: '请输入客户姓名',
      elProps: {},
      name: 'name',
    },
    {
      render() {
        return (
          <Space>
            <Button type="primary" style={{ width: 80 }} onClick={submit}>
              搜索
            </Button>
            <Button type="default" style={{ width: 80 }} onClick={reset}>
              重置
            </Button>
          </Space>
        );
      },
    },
  ];

  const columns = [
    {
      title: '主题',
      dataIndex: 'name',
    },
    {
      title: '结算公司',
      dataIndex: 'ownName',
    },
    {
      title: '活动范围',
      dataIndex: 'candidateType',
      render: (text) => activityRange.find((item) => item.value === text)?.label,
      width: 100,
    },
    {
      title: '参与公司',
      dataIndex: 'joinOrgName',
      render: (text) =>
        text ? (
          <Popover content={<div style={{ width: 300 }}>{text}</div>}>
            <div className="orgs">{text}</div>
          </Popover>
        ) : (
          '-'
        ),
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      render: (text) => channel.find((item) => item.value === text)?.label,
      width: 100,
    },

    {
      title: '渠道活动id',
      dataIndex: 'referenceId',
      width: 120,
    },
    {
      title: '渠道活动链接',
      dataIndex: '',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <Space>
            <a style={{ whiteSpace: 'nowrap' }}>编辑</a>
            <Popconfirm title="确认删除此活动吗?">
              <a style={{ whiteSpace: 'nowrap' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="form-page">
      <div className="list-search">
        <Button
          style={{ marginLeft: 15 }}
          type="primary"
          onClick={() => history.push('/biz/add-customer')}
        >
          新增客户
        </Button>
        <Form form={form} onFinish={search}>
          <FormRenderer layoutData={searchLayout} cols={3} />
        </Form>
      </div>
      <div>
        <Table
          className="table-content"
          columns={columns}
          {...tableProps}
          loading={loading}
          rowKey="id"
          style={{ marginTop: 20 }}
        />
      </div>
    </div>
  );
}
