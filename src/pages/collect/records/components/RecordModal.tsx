import ProForm, {
  FormInstance,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { message as Message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { getDepPlanCollect } from '@/services/collect';
import ProCard from '@ant-design/pro-card';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';
type LayoutType = Parameters<typeof ProForm>[0]['layout'];

const RecordModal: React.FC<any> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { ...user } = initialState;
  const formRef = useRef<FormInstance>();
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(
    LAYOUT_TYPE_HORIZONTAL,
  );

  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? { labelCol: { span: 4 }, wrapperCol: { span: 20 } }
      : null;

  //获取采集计划列表
  const getplanlist = async () => {
    const depcode = user.DepCode;
    const result = await getDepPlanCollect(depcode).then();
    const { resultType, appendData, message } = result;
    let res: any[] = [];
    if (resultType == 0) {
      appendData.map((item: any) => {
        let temp: any = {};
        item.name = `取样任务:${item.taskName}、单位：${item.collectDepName}  、采集人员：${item.assignWorker}`;
        temp['label'] = item.name;
        temp['value'] = item.id;
        res.push(temp);
        return item;
      });
    }
    return res;
  };

  //采集方式
  const collectChannelEnum = {
    1: {
      text: '烟农',
    },
    2: {
      text: '烟点',
    },
    3: {
      text: '仓储中心',
    },
  };

  useEffect(() => {}, [props.values]);

  return (
    <ModalForm
      title="采集记录"
      visible={props.ModalVisible}
      onFinish={async () => {
        Message.success('提交成功');
        return true;
      }}
      onVisibleChange={(visible: boolean) => {
        // if (!visible) {
        //     formRef?.current?.setFieldsValue({
        //     noticeId: [],
        //     name: '',
        //     sendTo: [],
        //     shippingAddress: '',
        //     contactName: '',
        //     contactPhone: '',
        //     requirements: '',
        //     });
        // }
        props.onVisibleChange(visible);
      }}
      {...formItemLayout}
      layout={formLayoutType}
    >
      <ProFormSelect
        name="collectplan"
        label="采集计划"
        placeholder="请选择采集计划"
        request={getplanlist}
        rules={[{ required: true, message: '请选择通知!' }]}
      />
      <ProFormSelect
        name="collectChannelId"
        label="采集方式"
        placeholder="请选择采集方式"
        valueEnum={collectChannelEnum}
        rules={[{ required: true, message: '请选择采集方式!' }]}
      />
    </ModalForm>
  );
};

export default RecordModal;
