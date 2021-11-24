import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import useColumns from './components/TaskColumns';
import { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Button, message as Message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskModel from './components/TaskModel';
import DelModel from './components/DelModel';
import CollectPlanModel from './components/CollectPlanModel';
import ItemModel from './components/ItemModel';
import { useModel } from 'umi';

type TableListItem = {
  id: string;
  name: string;
  requestFrom: string;
  noticeName: string;
  shippingAddress: string;
  contactName: string;
  contactPhone: string;
  requirements: string;
  createTime: string;
  status: string;
};

type TaskModelForm = {
  noticeId: string;
  name: string;
  sendTo: string;
  shippingAddress: string;
  contactName: string;
  contactPhone: string;
  requirements: string;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [TaskModalVisible, handleTaskModalVisible] = useState<boolean>(false);
  const [DelModelVisible, handleDeleModalVisible] = useState<boolean>(false);
  const [PlanModelVisible, handlePlanModelVisible] = useState<boolean>(false);
  const [ItemModelVisible, handleItemModelVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const { columns, getTaskPageList } = useColumns(
    handleTaskModalVisible,
    setCurrentRow,
    handleDeleModalVisible,
    actionRef,
    handlePlanModelVisible,
    handleItemModelVisible,
  );

  const { initialState } = useModel('@@initialState');
  const { ...user } = initialState;

  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <ProCard direction="column" ghost>
        <ProTable<TableListItem>
          columns={columns}
          actionRef={actionRef}
          headerTitle="取样任务"
          request={(params = {}) => {
            return getTaskPageList({ ...params, depCode: user.DepCode });
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          bordered
          // search = {false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => handleTaskModalVisible(true)}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
        <TaskModel
          ModalVisible={TaskModalVisible}
          handleModalVisible={handleTaskModalVisible}
          onVisibleChange={(visible: boolean) => {
            if (!visible) {
              setCurrentRow(undefined);
            }
            handleTaskModalVisible(visible);
          }}
          values={currentRow || {}}
          setCurrentRow={setCurrentRow}
          actionRef={actionRef}
        />
        <DelModel
          ModalVisible={DelModelVisible}
          onVisibleChange={(visible: boolean) => {
            if (!visible) {
              setCurrentRow(undefined);
            }
            handleDeleModalVisible(visible);
          }}
          values={currentRow || {}}
          setCurrentRow={setCurrentRow}
          actionRef={actionRef}
        />
        <CollectPlanModel
          ModalVisible={PlanModelVisible}
          onVisibleChange={(visible: boolean) => {
            if (!visible) {
              setCurrentRow(undefined);
            }
            handlePlanModelVisible(visible);
          }}
          values={currentRow || {}}
          setCurrentRow={setCurrentRow}
          actionRef={actionRef}
        />
        <ItemModel
          ModalVisible={ItemModelVisible}
          onVisibleChange={(visible: boolean) => {
            if (!visible) {
              setCurrentRow(undefined);
            }
            handleItemModelVisible(visible);
          }}
          values={currentRow || {}}
          setCurrentRow={setCurrentRow}
          actionRef={actionRef}
        />
      </ProCard>
    </PageContainer>
  );
};
