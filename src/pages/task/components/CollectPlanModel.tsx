import React, { useRef } from 'react';
import type { FC } from 'react';
import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { getWorkerList } from '@/services/worker';
import { getCityAndHub } from '@/services/dep';
import { addCollectPlan, getCollectPlanList } from '@/services/CollectPlan';
import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Modal,
  message as Message,
  Collapse,
  Tooltip,
  Divider,
} from 'antd';
import type { FormInstance } from 'antd';
import getCollectPlanItem from './planList';
import './style.less';

const CollectPlanModel: React.FC<any> = (props) => {
  const genExtra = () => (
    <ProForm
      layout="horizontal"
      className="extraIn"
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
          width="sm"
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
        {/* <Button block htmlType="submit">
        增加
      </Button> */}
        <Tooltip placement="top" title="编辑">
          <Button type="link" shape="circle">
            <EditOutlined />
          </Button>
          <Divider type="vertical" />
        </Tooltip>
      </ProForm.Group>
    </ProForm>
  );
  const { Panel } = Collapse;
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
    } else {
      Message.error(`${message}`);
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
      className="collectPlanModel"
    >
      <AddPlanFrom />
      {/* <ProCard
        title="可折叠"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            提交
          </Button>
        }
      >
        内容
      </ProCard> */}
      <Collapse
        defaultActiveKey={['1']}
        bordered={false}
        expandIconPosition="left"
      >
        <Panel header="" key="1" extra={genExtra()}>
          <p>你好1</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>你好2</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>你好23</p>
        </Panel>
      </Collapse>
    </Modal>
  );
};

export default CollectPlanModel;
