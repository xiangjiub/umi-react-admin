import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { useModel, request } from 'umi';
import { Button } from 'antd';

export default () => {
  const message = useModel('demo');
  const dep = useModel('dep');

  const { add, minus } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement,
  }));

  const data = () =>
    request('/api/users', {
      method: 'get',
      params: {
        name: 1,
      },
      skipErrorHandler: true,
    });

  return (
    <PageContainer>
      <div
        style={{
          height: '120vh',
        }}
      >
        form页面{message}
        <div>
          <Button onClick={add} type="primary">
            add by 1
          </Button>
          <Button onClick={minus} danger>
            minus by 1
          </Button>
          <Button onClick={data}>请求数据</Button>
        </div>
      </div>
    </PageContainer>
  );
};
