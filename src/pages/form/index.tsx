import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { Button } from 'antd';

export default () => {
  const message = useModel('demo');
  const { add, minus } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement,
  }));
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
        </div>
      </div>
    </PageContainer>
  );
};
