import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { Button } from 'antd';

const columns: ProColumns[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
  },
  {
    title: '标题',
    dataIndex: 'title',
    // search: false,
    ellipsis: true,
    copyable: true,
    width: 800,
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '创建者',
    dataIndex: 'user',
  },
];

export default () => {
  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <ProCard direction="column" ghost>
        <ProTable
          columns={columns}
          headerTitle="通知列表"
          // editable={{
          //     type: 'multiple',
          // }}
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            return request<{
              data: any[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            });
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          search={{
            defaultCollapsed: false,
            labelWidth: 'auto',
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button key="out">导出</Button>,
            ],
          }}
          bordered
        />
      </ProCard>
    </PageContainer>
  );
};
