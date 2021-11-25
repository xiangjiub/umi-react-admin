import ProList from '@ant-design/pro-list';
import { useEffect, useState } from 'react';
import { getCollectPlanList } from '@/services/task';
import { message as Message, Descriptions, Button } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import type { ReactText } from 'react';
import CollectItemTable from './CollectItemTable';
export default (props: any) => {
  const [dataSource, setDataSource] = useState<any[]>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>(
    [],
  );

  const collectPlanList = async () => {
    const taskId = props.taskId;
    const result = await getCollectPlanList(taskId).then();
    const { resultType, appendData, message } = result;

    if (resultType === 0) {
      const res = appendData.map((item: any, index: number) => {
        item.assignworkerstr = `单位：${item.collectDepName}  、采集人员：${item.assignWorker}、总重量：${item.totalWeight} (公斤)`;
        if (index == 0) {
          setExpandedRowKeys([item.id]);
        }
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
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      split={true}
      metas={{
        avatar: {
          // dataIndex: 'image',
          editable: false,
          render: () => (
            <RobotOutlined style={{ fontSize: '16px', color: '#08c' }} />
          ),
        },
        title: {
          dataIndex: 'assignworkerstr',
        },
        actions: {
          render: (text, row, index, action) => [
            <a
              onClick={() => {
                action?.startEditable(row.id);
              }}
              key="link"
            >
              编辑
            </a>,
          ],
        },
        description: {
          editable: false,
          render: (text, row, index, action) => [
            // row.items.map((item:any)=>
            // <li>{item.id}</li>
            // )
            // <CollectItemTable />
            // <></>
          ],
        },
        // content: {
        //     render: (text, row, index, action) => [
        //     <a
        //         onClick={() => {
        //         action?.startEditable(row.id);
        //         }}
        //         key="link"
        //     >
        //         编辑
        //     </a>,
        //     ],
        // }
      }}
      expandable={{
        expandedRowKeys,
        defaultExpandAllRows: false,
        onExpandedRowsChange: setExpandedRowKeys,
      }}
    ></ProList>
  );
};
