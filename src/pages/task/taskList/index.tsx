import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { samplingTaskItem, addCollectPlan } from '@/services/task';
import { message as Message, Descriptions, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormInstance,
} from '@ant-design/pro-form';
import { getCityAndHub } from '@/services/dep';
import { getWorkerSelect } from '@/services/worker';
import { PlusOutlined } from '@ant-design/icons';
import CollectList from './CollectList';

type TaskItemType = {
  id: string;
  name: string;
  taskSource: string;
  noticeName: string;
  requestFrom: string;
  createTime: string;
  requirements: string;
  shippingAddress: string;
  contactName: string;
  contactPhone: string;
  status: string;
  statusId: string;
  depCode: string;
};

export default (props: any) => {
  const [formstate, setTaskItem] = useState<TaskItemType>();
  const [taskId, setTaskId] = useState<string>();
  const formRef = useRef<
    ProFormInstance<{
      dep: string;
      collectworks?: string;
    }>
  >();

  //获取任务明细
  const getTaskItem = async (id: string) => {
    const result = await samplingTaskItem(id).then();
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      setTaskItem(appendData);
      Message.success(`${message}`);
    } else {
      Message.error(`${message}`);
    }
  };

  //获取采集人员
  const WorkerRequest = async (params: any) => {
    const depCode = params?.dep?.value ? params?.dep?.value : '';
    let result = await getWorkerSelect(depCode);

    let res: any[] = [];
    result.map((item: any) => {
      let temp: any = {};
      temp['label'] = item.Name;
      temp['value'] = item.WorkerCode;
      res.push(temp);
    });
    return res;
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    const { id } = props.match.params;
    setTaskId(id);
    getTaskItem(id);
  }, [props.match.params]);

  return (
    <PageContainer content={`任务名：${formstate?.name}`}>
      <ProCard direction="column">
        <Descriptions>
          <Descriptions.Item label="需求单位">
            {formstate?.requestFrom}
          </Descriptions.Item>
          <Descriptions.Item label="通知名称">
            {formstate?.noticeName}
          </Descriptions.Item>
          <Descriptions.Item label="">{}</Descriptions.Item>
          <Descriptions.Item label="联 系 人 ">
            {formstate?.contactName}
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
            {formstate?.contactPhone}
          </Descriptions.Item>
          <Descriptions.Item label="配送地址">
            {formstate?.shippingAddress}
          </Descriptions.Item>
        </Descriptions>
        <ProForm
          formRef={formRef}
          layout={'inline'}
          onFinish={async (values: any) => {
            // console.log(values);
            // const val = await formRef.current?.validateFields();

            const data = {
              taskId,
              collectDep: values?.dep.key,
              collectFullDep: values?.dep.key,
              collectDepName: values?.dep.label,
              assignWorker: values?.collectworks.label,
              assignWorkerCode: values?.collectworks.key,
              items: [],
            };
            const result = await addCollectPlan(data).then();
            const { resultType, appendData, message } = result;
            if (resultType == 0) {
              Message.success(`${message}`);
            } else {
              Message.error(`${message}`);
            }

            return true;
          }}
          submitter={{
            searchConfig: {
              submitText: '新 增',
              resetText: '重 置',
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
                let result = await getCityAndHub().then();
                let res: any[] = [];

                result.map((item: any) => {
                  let temp: any = {};
                  temp['label'] = item.DepName;
                  temp['value'] = item.DepCode;
                  res.push(temp);
                });
                return res;
              }}
              label="采集单位"
              placeholder="请选择采集单位"
              name="dep"
              rules={[{ required: true, message: '请选择采集单位!' }]}
            />
            <ProFormSelect
              width="md"
              fieldProps={{
                labelInValue: true,
              }}
              dependencies={['dep']}
              request={WorkerRequest}
              label="采集人员"
              placeholder="请选择采集人员"
              name="collectworks"
              rules={[{ required: true, message: '请选择采集人员!' }]}
            />
          </ProForm.Group>
        </ProForm>
        <CollectList
          taskId={taskId}
          style={{ marginTop: '100px' }}
        ></CollectList>
      </ProCard>
    </PageContainer>
  );
};
