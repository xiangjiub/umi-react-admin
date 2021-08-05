import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { getPageData } from '@/services/task';
import { Fragment } from 'react';
import { Tooltip } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';

export default function useColumns(
  handleTaskModalVisible: any,
  setCurrentRow: any,
) {
  const columns: ProColumns[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '需求单位',
      dataIndex: 'requestFrom',
      search: false,
    },
    {
      title: '通知',
      dataIndex: 'noticeName',
      search: false,
    },
    {
      title: '配送地址',
      dataIndex: 'shippingAddress',
      search: false,
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      search: false,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      search: false,
    },
    {
      title: '取样要求',
      dataIndex: 'requirements',
      search: false,
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   search: false,
    // },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'action',
      search: false,
      align: 'center',
      render: (_, record) => [
        <Fragment key="action">
          <Tooltip title="编辑">
            <a
              type="link"
              onClick={() => {
                setCurrentRow(record);
                handleTaskModalVisible(true);
              }}
            >
              <EditOutlined />
            </a>
            {/* <a type="link" onClick={() => {getNoticeItem(record?.id);}}>
                <EditOutlined />
              </a> */}
          </Tooltip>
        </Fragment>,
      ],
    },
  ];

  //获取任务分页数据
  const getTaskPageList = async (params: any) => {
    const result = await getPageData(params).then();
    const { resultType, appendData } = result;
    if (resultType == 0) {
      return {
        data: appendData.items,
        success: true,
        total: appendData.totalItems,
      };
    } else {
      return {
        data: appendData.items,
        success: false,
        total: appendData.totalItems,
      };
    }
  };

  return { columns, getTaskPageList };
}
