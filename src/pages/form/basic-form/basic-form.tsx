import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText } from '@ant-design/pro-form';

import { Card } from 'antd';

const onFinish = async (values: Record<string, any>) => {
  // run(values);
};

export default () => {
  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      {/* <div
        style={{
          height: '800px',
        }}
      > */}
      <Card bordered={false}>
        <ProForm
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            name="company"
            label="我方公司名称"
            placeholder="请输入名称"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              // {
              // pattern: /^1\d{10}$/,
              // message: '不合法的手机号格式!',
              // },
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
