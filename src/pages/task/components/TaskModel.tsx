import React from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';

const TaskModel: React.FC<any> = (props) => {
  return (
    <ModalForm
      title="取样任务"
      width="800px"
      layout="horizontal"
      visible={props.ModalVisible}
      onVisibleChange={props.handleModalVisible}
      onFinish={props.onSubmit}
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
  );
};

export default TaskModel;
