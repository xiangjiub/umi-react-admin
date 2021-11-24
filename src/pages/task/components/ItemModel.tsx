import ProForm, { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { deleteSamplingTask } from '@/services/task';
import { message as Message, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { CollectPlan } from './type';

const ItemModel: React.FC<any> = (props) => {
  const [PlanformState, setPlanState] = useState<CollectPlan>({
    taskId: '',
    planId: '',
    collectDep: '',
    depCode: '', //烟点编码
    collectDepName: '',
    assignWorker: '',
    assignWorkerCode: '',
    assignworkerstr: '',
    editCollapse: false,
    items: [],
  });

  const [TaskFormState, setTaskState] = useState({
    name: '',
    requestFrom: '',
    noticeName: '',
    shippingAddress: '',
    contactName: '',
    contactPhone: '',
    createTime: '',
    status: '',
    requirements: '',
  });

  useEffect(() => {
    // console.log('查看了明细');
    setTaskState({
      name: props.values?.name,
      requestFrom: props.values?.requestFrom,
      noticeName: props.values?.noticeName,
      shippingAddress: props.values?.shippingAddress,
      contactName: props.values?.contactName,
      contactPhone: props.values?.contactPhone,
      createTime: props.values?.createTime,
      status: `任务状态${props.values?.status}`,
      requirements: props.values?.requirements,
    });
  }, [props.values]);

  return (
    <ModalForm
      title="采集计划明细"
      width="800px"
      layout="horizontal"
      visible={props.ModalVisible}
      onVisibleChange={props.onVisibleChange}
      onFinish={async (value: any) => {
        props.onVisibleChange(false);
      }}
    >
      <Descriptions title={TaskFormState.status}>
        <Descriptions.Item label="任务名称">
          {TaskFormState.name}
        </Descriptions.Item>
        <Descriptions.Item label="通知">
          {TaskFormState.noticeName}
        </Descriptions.Item>
        <Descriptions.Item label="需求单位">
          {TaskFormState.requestFrom}
        </Descriptions.Item>
        <Descriptions.Item label="联系人">
          {TaskFormState.contactName}
        </Descriptions.Item>
        <Descriptions.Item label="联系电话">
          {TaskFormState.contactPhone}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {TaskFormState.createTime}
        </Descriptions.Item>
      </Descriptions>
    </ModalForm>
  );
};

export default ItemModel;
