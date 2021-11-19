import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { getPageData, samplingTaskPublish } from '@/services/task';
import { Fragment } from 'react';
import { Tooltip, Divider, Button, Popconfirm, message as Message } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';
// import { Icon } from '@iconify/react';

export default function useColumns(
  handleTaskModalVisible: any,
  setCurrentRow: any,
  handleDeleModalVisible: any,
  actionRef: any,
  handlePlanModelVisible: any,
  handleItemModelVisible: any,
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
      width: 220,
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
          </Tooltip>
          <Divider type="vertical"></Divider>
          <Tooltip title="采集计划">
            <a
              type="link"
              onClick={() => {
                setCurrentRow(record);
                handlePlanModelVisible(true);
              }}
            >
              {/* <Icon icon="bx:bx-collection" style={{ width: '16px' }} /> */}
            </a>
          </Tooltip>
          <Divider type="vertical"></Divider>

          <Tooltip title="发布">
            <a
              type="link"
              onClick={() => {
                push(record);
              }}
            >
              {/* <Icon icon="ic:round-publish" style={{ width: '16px' }} /> */}
            </a>
          </Tooltip>
          <Divider type="vertical"></Divider>
          <Tooltip title="采集计划明细">
            <a
              type="link"
              onClick={() => {
                setCurrentRow(record);
                handleItemModelVisible(true);
              }}
            >
              {/* <Icon icon="mdi:eye" style={{ width: '16px' }} /> */}
            </a>
          </Tooltip>
          <Divider type="vertical"></Divider>
          <Popconfirm
            title="你确定删除吗？"
            placement="leftTop"
            onConfirm={() => Delete(record)}
          >
            <Tooltip placement="top" title="删除">
              <a href="#">
                <DeleteOutlined />
              </a>
            </Tooltip>
          </Popconfirm>
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

  //删除操作
  const Delete = (record: any) => {
    setCurrentRow(record);
    handleDeleModalVisible(true);
  };

  //发布任务
  const push = async (record: any) => {
    const data = {
      taskId: record.id,
    };
    const result = await samplingTaskPublish(data).then();
    const { resultType, message, appendData } = result;
    if (resultType == 0) {
      Message.success(`${message}`);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      Message.error(`${message}`);
    }
  };

  return { columns, getTaskPageList };
}
