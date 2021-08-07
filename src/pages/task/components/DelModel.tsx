import ProForm, { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { deleteSamplingTask } from '@/services/task';
import { message as Message } from 'antd';

const DelModel: React.FC<any> = (props) => {
  return (
    <ModalForm
      title="删除任务"
      width="760px"
      layout="horizontal"
      visible={props.ModalVisible}
      onVisibleChange={props.onVisibleChange}
      onFinish={async (value: any) => {
        const data = {
          id: props.values?.id,
          reason: value.reason,
        };
        const result = await deleteSamplingTask(data).then();
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
      }}
    >
      <ProFormTextArea
        name="reason"
        label="删除原因"
        placeholder="请输入删除原因"
        rules={[{ required: true, message: '请输入删除原因' }]}
      />
    </ModalForm>
  );
};

export default DelModel;
