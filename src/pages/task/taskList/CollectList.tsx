import ProList from '@ant-design/pro-list';
import { useEffect, useState } from 'react';
import { getCollectPlanList } from '@/services/task';
import { message as Message, Descriptions, Button } from 'antd';

export default (props: any) => {
  const [dataSource, setDataSource] = useState<any[]>();

  const collectPlanList = async () => {
    const taskId = props.taskId;
    const result = await getCollectPlanList(taskId).then();
    const { resultType, appendData, message } = result;

    if (resultType === 0) {
      const res = appendData.map(function (item: any) {
        item.assignworkerstr = `单位：${item.collectDepName}  、采集人员：${item.assignWorker}、总重量：${item.totalWeight} (公斤)`;
        return item;
      });
      setDataSource(res);
    } else {
      Message.error(`${message}`);
    }
  };

  useEffect(() => {
    props.taskId ? collectPlanList() : '';
  }, [props.taskId]);

  return (
    <ProList
      rowKey="id"
      dataSource={dataSource}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'assignworkerstr',
        },
      }}
    ></ProList>
  );
};
