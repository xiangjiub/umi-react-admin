import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import request from 'umi-request';
import { Button, Tooltip, message as Message } from 'antd';
import { getNoticeList } from '@/services/notice';
import { useRequest } from '@/.umi/plugin-request/request';
import { useState } from 'react';
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export type TableListItem = {
  id: string;
  title: string;
  statusId: string;
  status: string;
  createTime: string;
  priority: string;
};

export default () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState();

  const getTableData = async (params: any) => {
    const data = await getNoticeList(params);
    const { resultType, appendData } = data;
    if (resultType == 0) {
      return {
        data: appendData.items,
        success: true,
        total: appendData.totalItems,
      };
    } else {
      return {
        data: appendData.items,
        success: false,
        total: appendData.totalItems,
      };
    }
  };

  const columns: ProColumns[] = [
    {
      title: '标题',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
      ellipsis: true,
      copyable: true,
      // width: 800,
    },
    {
      title: '状态',
      dataIndex: 'statusId',
      hideInTable: true,
      valueEnum: {
        0: { text: '全部' },
        1: {
          text: '创建',
        },
        2: {
          text: '已经发送',
        },
        '-1': {
          text: '作废',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '级别',
      dataIndex: 'priority',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      key: 'option',
      render: (_, record) => [
        <Tooltip title="删除" key={record.id}>
          <Button
            type="link"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <ProCard direction="column" ghost>
        <ProTable<TableListItem>
          columns={columns}
          headerTitle="通知列表"
          // editable={{
          //     type: 'multiple',
          // }}
          // request={async (params = {}, sort, filter) => {
          //   console.log(sort, filter);
          //   return request<{
          //     data: any[];
          //   }>('https://proapi.azurewebsites.net/github/issues', {
          //     params,
          //   });
          // }}
          // request = {
          //   async (
          //     // 第一个参数 params 查询表单和 params 参数的结合
          //     // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          //     params: {T:any}
          //   ) => {

          //     const result = await getNoticeList({...params})
          //     console.log(result,'返回的数据',params);
          //     const {resultType,appendData} = result
          //     if(resultType == 0){
          //       return {
          //         data: appendData.items,
          //         // success 请返回 true，
          //         // 不然 table 会停止解析数据，即使有数据
          //         success: true,
          //         // 不传会使用 data 的长度，如果是分页一定要传
          //         total: appendData.totalItems,
          //       };
          //     }else{
          //       return {
          //         success: false,
          //       };
          //     }

          //   }
          // }
          request={(params = {}) => {
            return getTableData(params);
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          // search={{
          //   defaultCollapsed: false,
          //   labelWidth: 'auto',
          //   optionRender: (searchConfig, formProps, dom) => [
          //     ...dom.reverse(),
          //     <Button key="out">导出</Button>,
          //   ],
          // }}
          bordered
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => handleModalVisible(true)}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
        <ModalForm
          title="新建规则"
          width="800px"
          // trigger={
          //   <Button type="primary">
          //     新建表单
          //   </Button>
          // }
          layout={'vertical'}
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            // const success = await handleAdd(value as TableListItem);
            // if (success) {
            //   handleModalVisible(false);
            //   if (actionRef.current) {
            //     actionRef.current.reload();
            //   }
            // }
            handleModalVisible(false);
          }}
        >
          <ProFormText
            rules={[
              {
                required: true,
                message: '规则名称为必填项',
              },
            ]}
            width="xl"
            name="name"
            label="主合同编号"
          />
          <ProFormTextArea width="md" name="desc" label="项目名称" />
        </ModalForm>
        <ModalForm
          title="删除通知"
          width="800px"
          layout="horizontal"
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          onFinish={async (values) => {
            console.log('提交数据', values);
            Message.success('提交成功');
            return true;
          }}
        >
          <ProFormTextArea
            rules={[
              {
                required: true,
                message: '删除原因为必填项',
              },
            ]}
            width="xl"
            name="remark"
            label="删除原因"
            placeholder="请输入删除原因"
          />
        </ModalForm>
      </ProCard>
    </PageContainer>
  );
};
