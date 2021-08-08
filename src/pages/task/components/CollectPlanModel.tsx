import React, { useRef } from 'react';
import type { FC } from 'react';
import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { getWorkerList } from '@/services/worker';
import { getCityAndHub } from '@/services/dep';
import { addCollectPlan, getCollectPlanList } from '@/services/CollectPlan';
import { Button, Modal, message as Message } from 'antd';
import type { FormInstance } from 'antd';

const CollectPlanModel: React.FC<any> = (props) => {
  const formRef = useRef<FormInstance>();

  const handleCancel = () => {
    props.onVisibleChange(false);
    props.setCurrentRow(undefined);
  };

  //新增采集计划
  const addplan = async (values: any) => {
    console.log(values);
    const data = {
      taskId: props.values?.id,
      collectDep: values?.dep?.key,
      collectDepName: values?.dep.label,
      assignWorker: values?.assignWorker.label,
      assignWorkerCode: values?.assignWorker.key,
    };
    const result = await addCollectPlan(data).then();
    const { resultType, appendData, message } = result?.data;
    if (resultType == 0) {
      Message.success(`${message}`);
      getCollectPlanItem();
    } else {
      Message.error(`${message}`);
    }
  };

  const getCollectPlanItem = async () => {
    const result = await getCollectPlanList(props.values?.id).then();
    const { resultType, appendData, message } = result?.data;
    if (resultType == 0) {
    } else {
      Message.error(message);
    }
  };

  const AddPlanFrom = () => (
    <ProForm
      formRef={formRef}
      onFinish={async (values) => {
        addplan(values);
      }}
      submitter={{
        render: (props, doms) => {
          return [];
        },
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          width="md"
          fieldProps={{
            labelInValue: true,
          }}
          request={async () => {
            let params = await getCityAndHub();

            let res: any[] = [];
            params.map((item: any) => {
              let temp: any = {};
              temp['label'] = item.DepName;
              temp['value'] = item.DepCode;
              res.push(temp);
            });
            return res;
          }}
          label="单位"
          placeholder="请选择单位"
          name="dep"
          rules={[{ required: true, message: '请选择单位!' }]}
        />
        <ProFormSelect
          width="sm"
          fieldProps={{
            labelInValue: true,
          }}
          request={async () => {
            let params = await getWorkerList();

            let res: any[] = [];
            params.map((item: any) => {
              let temp: any = {};
              temp['label'] = item.Name;
              temp['value'] = item.WorkerCode;
              res.push(temp);
            });
            return res;
          }}
          label="采集人员"
          placeholder="请选择采集人员"
          name="assignWorker"
          rules={[{ required: true, message: '请选择采集人员' }]}
        />
        <Button block htmlType="submit">
          增加
        </Button>
      </ProForm.Group>
    </ProForm>
  );

  return (
    <Modal
      width="820px"
      title="采集计划"
      visible={props.ModalVisible}
      onCancel={handleCancel}
      onOk={async (value: any) => {
        props.onVisibleChange(false);
        props.setCurrentRow(undefined);
      }}
    >
      <AddPlanFrom />
    </Modal>
  );
};

export default CollectPlanModel;
