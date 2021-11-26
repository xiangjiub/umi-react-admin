import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import useColumns from './components/RecordColumns';
import { useModel } from 'umi';
export type TableListItem = {
  samplingTask: string; //取样任务
  channel: number; //采集方式
  collectSource: string; //采集源
  createTime: string; //创建时间
  workerName: number; //录入人员
  status: number; //状态
};

//采集记录
export default () => {
  const { columns, getpages } = useColumns();

  const { initialState } = useModel('@@initialState');
  const { ...user } = initialState;

  return (
    <PageContainer content="采集记录情况">
      <ProCard direction="column" ghost>
        <ProTable<TableListItem>
          columns={columns}
          request={(params = {}) => {
            return getpages({ ...params, workerCode: user.WorkerCode });
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
        ></ProTable>
      </ProCard>
    </PageContainer>
  );
};
