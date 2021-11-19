import React, { useEffect, useRef } from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Modal, Card, message as Message } from 'antd';
import { getNoticeSlect } from '@/services/notice';
import type { FormInstance } from 'antd';
import { SampleTaskcreate, sampleTaskEdit } from '@/services/task';
import { useModel } from 'umi';

type CreateFormProps = {
  modalVisible: boolean;
  onCancel: () => void;
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

import { getNoticeSelect } from '@/services/notice';

const TaskModel: React.FC<any> = (props) => {
  const formRef = useRef<FormInstance>();
  const { initialState } = useModel('@@initialState');
  const { ...user } = initialState;

  useEffect(() => {
    // console.log('更新了',props.values);
    formRef?.current?.setFieldsValue({
      noticeId: props.values?.taskSource,
      name: props.values?.name,
      sendTo: props.values?.requestFrom,
      shippingAddress: props.values?.shippingAddress,
      contactName: props.values?.contactName,
      contactPhone: props.values?.contactPhone,
      requirements: props.values?.requirements,
    });
  }, [props.values]);
  return (
    <ModalForm
      formRef={formRef}
      title="取样任务"
      width="800px"
      layout="vertical"
      visible={props.ModalVisible}
      // onVisibleChange={(visible: boolean) => {
      //   props.handleModalVisible(visible)
      // }}
      onVisibleChange={props.handleModalVisible}
      onFinish={props.onSubmit}
    >
      <ProForm.Group>
        <ProFormSelect
          fieldProps={{
            labelInValue: true,
          }}
          request={async () => {
            let result = await getNoticeSelect();
            if (result?.resultType == 0) {
              let res: any[] = [];
              result?.appendData?.map((item: any) => {
                let temp: any = {};
                temp['label'] = item.name;
                temp['value'] = item.id;
                res.push(temp);
              });
              return res;
            } else {
              return [];
            }
          }}
          width="xl"
          name="noticeId"
          placeholder="请选择通知"
          label="通知"
        />
      </ProForm.Group>
      {/* onVisibleChange={props.onVisibleChange}
      onFinish={async (value: TaskModelForm) => {
        if (props.values?.id) {
          //编辑
          const data = {
            ...value,
            depCode: user.DepCode,
            depName: user.DepName,
            taskId: props.values?.id,
          };
          const result = await sampleTaskEdit(props.values?.id, data).then();
          const { resultType, message, appendData } = result;
          if (resultType == 0) {
            Message.success(`${message}`);
            props.onVisibleChange(false);
            props.setCurrentRow(undefined);
            if (props.actionRef.current) {
              props.actionRef.current.reload();
            }
          } else {
            Message.error(`${message}`);
          }
        } else {
          //新增
          const result = await SampleTaskcreate({
            ...value,
            depCode: user.DepCode,
            depName: user.DepName,
          }).then();
          const { resultType, message, appendData } = result;
          if (resultType == 0) {
            Message.success(`${message}`);
            // handleTaskModalVisible(false)
            props.onVisibleChange(false);
            props.setCurrentRow(undefined);
            if (props.actionRef.current) {
              props.actionRef.current.reload();
            }
          } else {
            Message.error(`${message}`);
          }
        }
      }} */}
      <ProFormSelect
        name="noticeId"
        label="通知"
        placeholder="请选择通知"
        request={async () => {
          let result = await getNoticeSlect().then();
          const { resultType, appendData, message } = result;

          let res: any[] = [];
          if (resultType == 0) {
            appendData.map((item: any) => {
              let temp: any = {};
              temp['label'] = item.name;
              temp['value'] = item.id;
              res.push(temp);
              return item;
            });
          }

          return res;
        }}
        rules={[{ required: true, message: '请选择通知!' }]}
      />
      <ProFormText
        name="name"
        label="任务名称"
        placeholder="请输入任务名称"
        rules={[{ required: true, message: '请输入任务名称!' }]}
      />
      <ProFormText
        name="sendTo"
        label="需求单位"
        placeholder="请输入需求单位"
        initialValue={props.values?.sendTo}
      />
      <ProFormText
        name="shippingAddress"
        label="配送地址"
        placeholder="请输入配送地址"
      />
      <ProFormText
        name="contactName"
        label="联系人"
        placeholder="请输入联系人"
      />
      <ProFormText
        name="contactPhone"
        label="联系人电话"
        placeholder="请输入联系人电话"
      />
      <ProFormTextArea
        name="requirements"
        label="取样要求"
        placeholder="请输入取样要求"
      />
    </ModalForm>
  );
};

export default TaskModel;
