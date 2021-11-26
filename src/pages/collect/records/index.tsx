import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { ActionType } from '@ant-design/pro-table';
import useColumns from './components/RecordColumns';
import { useModel } from 'umi';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import RecordModal from './components/RecordModal';

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
  const [RecordModalVisible, handleRecordModelVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();

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
          toolBarRender={() => [
            <Button
              key="3"
              type="primary"
              onClick={() => {
                handleRecordModelVisible(true);
              }}
            >
              <PlusOutlined />
              新建
            </Button>,
          ]}
        ></ProTable>

        <RecordModal
          ModalVisible={RecordModalVisible}
          handleModalVisible={handleRecordModelVisible}
          onVisibleChange={(visible: boolean) => {
            if (!visible) {
              setCurrentRow(undefined);
            }
            handleRecordModelVisible(visible);
          }}
          values={currentRow || {}}
          setCurrentRow={setCurrentRow}
          actionRef={actionRef}
        />
      </ProCard>
    </PageContainer>
  );
};
