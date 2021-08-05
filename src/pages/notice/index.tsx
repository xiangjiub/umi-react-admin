import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProList from '@ant-design/pro-list';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import request from 'umi-request';
import type { FormInstance } from 'antd';
import { Button, Tooltip, message as Message, Form, Divider } from 'antd';
import {
  getNoticeList,
  deleteNotice,
  addNotice,
  getItemList,
  deleteNoticeAssign,
  addNoticeAssign,
  updateNotice,
  pushNotice,
} from '@/services/notice';
import { getWorkerList } from '@/services/worker';
import { getCityAndHub } from '@/services/dep';
import { guid } from '@/utils/common';
import { useRequest } from '@/.umi/plugin-request/request';
import React, { useRef, useState, Fragment, useEffect } from 'react';
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';

export type TableListItem = {
  id: string;
  title: string;
  statusId: string;
  status: string;
  createTime: string;
  priority: string;
};

type NoticeItem = {
  id: string | undefined;
  title: string;
  priority: string;
  dep: string;
  noticeworks: string;
  assigns: assignsItem[];
};

type assignsItem = {
  id: string;
  useid: string;
  content: string;
  image: string;
  depCode: string;
  depName: string;
  workerCode: string;
  workerName: string;
};

export default () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, handleDeleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();

  const [updateItemData, setUpdateItemData] = useState<NoticeItem>({
    id: '',
    title: '',
    priority: '',
    dep: '',
    noticeworks: '',
    assigns: [],
  });
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  // 获取table数据
  const getTableData = async (params: any) => {
    const data = await getNoticeList(params);
    const { resultType, appendData } = data;
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

  //删除通知
  const disNotice = async (params: API.pushParmas) => {
    const data = await deleteNotice(params);
    const { resultType, appendData, message } = data;
    if (resultType == 0) {
      Message.success(`${message}`);
      return true;
    } else {
      Message.error(`${message}`);
      return false;
    }
  };

  //新增通知
  const addNoticeData = async (params: API.AddNoticeParams) => {
    const data = await addNotice(params);
    const { resultType, appendData, message } = data;
    if (resultType == 0) {
      Message.success(`${message}`);
      return true;
    } else {
      Message.error(`${message}`);
      return false;
    }
  };

  // 获取编辑通知明细id
  const getNoticeItem = async (id?: string) => {
    const result = await getItemList(id).then();
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      const resWorkData = appendData?.assigns.map((item: any) => {
        const noticeInfo = `单位：${item.depName}、  通知人员：${item.workerName}`;
        item.useid = guid();
        item.content = noticeInfo;
        item.image =
          'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg';
        return item;
      });

      const data = {
        id,
        title: appendData?.title,
        priority: appendData?.priority,
        dep: '',
        noticeworks: '',
        assigns: resWorkData,
      };

      setUpdateItemData(data);
      formRef?.current?.setFieldsValue({
        id,
        title: appendData?.title,
        priority: appendData?.priority,
      });
      handleModalVisible(true);
      return {
        data,
        success: true,
      };
    }
  };

  // 删除通知明细
  const deleteNoticeItem = async (noticeId: string, assignId: string) => {
    const result = await deleteNoticeAssign({ noticeId, assignId });
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      Message.success(`${message}`);
      getNoticeItem(noticeId);
    } else {
      Message.error(`${message}`);
    }
  };

  //更新通知
  const updateNoticeInfo = async (data: API.UpdateNoticeParams) => {
    const result = await updateNotice(data);
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      Message.success(`${message}`);
      handleModalVisible(false);
      actionRef.current?.reload();
    } else {
      Message.error(`${message}`);
      handleModalVisible(true);
    }
  };

  //提交通知
  const pushAction = async (id: string) => {
    const result = await pushNotice(id);
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      Message.success(`${message}`);
      actionRef.current?.reload();
    } else {
      Message.error(`${message}`);
    }
  };

  type useNotice = {
    useid: string;
    content: string;
    image: string;
  };

  // 新增通知明细数据
  const addNoticeItem = async (data: API.AddNoticeAssignParams & useNotice) => {
    const result = await addNoticeAssign(data).then();
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      Message.success(`${message}`);
      getNoticeItem(data.noticeId);
    } else {
      Message.error(`${message}`);
    }
  };

  useEffect(() => {
    // console.log('执行了');
  }, [updateItemData]);

  //获取单位信息
  const getdeplist = async () => {
    const data = await getCityAndHub();
    // console.log(data, '单位数据');
  };

  const getMock = () => {
    request('/api/users/1').then((res) => {
      // console.log(res, '唱的那首');
    });
  };

  const columns: ProColumns[] = [
    {
      title: '标题',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
      ellipsis: true,
      copyable: true,
      // width: 800,
    },
    {
      title: '状态',
      dataIndex: 'statusId',
      hideInTable: true,
      valueEnum: {
        0: { text: '全部' },
        1: {
          text: '创建',
        },
        2: {
          text: '已经发送',
        },
        '-1': {
          text: '作废',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '级别',
      dataIndex: 'priority',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      key: 'option',
      align: 'center',
      render: (_, record) => [
        <Fragment key="action">
          <Tooltip title="编辑">
            {/* <a type="link" onClick={() => {handleModalVisible(true);setCurrentRow(record)}}><EditOutlined /></a> */}
            <a
              type="link"
              onClick={() => {
                getNoticeItem(record?.id);
              }}
            >
              <EditOutlined />
            </a>
          </Tooltip>
          <Divider type="vertical"></Divider>
          <Tooltip title="提交">
            <a
              type="link"
              onClick={() => {
                pushAction(record?.id);
              }}
            >
              <CheckOutlined />
            </a>
          </Tooltip>
          <Divider type="vertical"></Divider>
          <Tooltip title="删除">
            <a
              type="link"
              onClick={() => {
                handleDeleModalVisible(true);
                setCurrentRow(record);
              }}
            >
              <DeleteOutlined />
            </a>
          </Tooltip>
        </Fragment>,
      ],
    },
  ];

  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <ProCard direction="column" ghost>
        <ProTable<TableListItem>
          columns={columns}
          actionRef={actionRef}
          headerTitle="通知列表"
          request={(params = {}) => {
            return getTableData(params);
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          bordered
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => handleModalVisible(true)}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
        <ModalForm
          title={
            formRef?.current?.getFieldValue('id') ? '编辑通知' : '新增通知'
          }
          width="800px"
          formRef={formRef}
          layout={'vertical'}
          visible={createModalVisible}
          onVisibleChange={(visible: boolean) => {
            if (!visible) {
              setUpdateItemData({
                id: '',
                title: '',
                priority: '',
                assigns: [],
                dep: '',
                noticeworks: '',
              });

              formRef?.current?.setFieldsValue({
                id: '',
                title: '',
                priority: '',
                dep: { value: undefined, label: undefined },
                noticeworks: { value: undefined, label: undefined },
              });
              handleModalVisible(visible);
            }
          }}
          onValuesChange={(_, values) => {
            // console.log('FROM值的改变', values);
          }}
          onFinish={async (value) => {
            if (formRef?.current?.getFieldValue('id')) {
              //编辑

              const data = {
                id: formRef?.current?.getFieldValue('id'),
                title: value.title,
                priority: value.priority,
                attachment: '',
              };
              updateNoticeInfo(data);
            } else {
              //新增
              const data = {
                title: value.title,
                priority: value.priority,
                attachment: '',
                assigns: updateItemData?.assigns,
              };
              const res = await addNoticeData(data);
              if (res) {
                handleModalVisible(false);
              } else {
                handleModalVisible(true);
              }
            }
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="title"
              label="标题"
              placeholder="请输入标题名称"
              rules={[
                {
                  required: true,
                  message: '标题名称为必填项',
                },
              ]}
            />
            <ProFormSelect
              width="md"
              options={[
                {
                  value: '普通',
                  label: '普通',
                },
                {
                  value: '重要',
                  label: '重要',
                },
                {
                  value: '紧急',
                  label: '紧急',
                },
              ]}
              label="优先级别"
              placeholder="请选择优先级别"
              name="priority"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="md"
              fieldProps={{
                labelInValue: true,
              }}
              request={async () => {
                let params = await getCityAndHub();

                let res: any[] = [];
                params.map((item: any) => {
                  let temp: any = {};
                  temp['label'] = item.DepName;
                  temp['value'] = item.DepCode;
                  res.push(temp);
                });
                return res;
              }}
              label="单位"
              placeholder="请选择单位"
              name="dep"
            />
            <ProFormSelect
              width="sm"
              fieldProps={{
                labelInValue: true,
              }}
              request={async () => {
                let params = await getWorkerList();

                let res: any[] = [];
                params.map((item: any) => {
                  let temp: any = {};
                  temp['label'] = item.Name;
                  temp['value'] = item.WorkerCode;
                  res.push(temp);
                });
                return res;
              }}
              label="通知人员"
              placeholder="请选择通知人员"
              name="noticeworks"
            />

            <Button
              type="primary"
              onClick={() => {
                const depCode = formRef?.current?.getFieldValue('dep')?.key;
                const depName = formRef?.current?.getFieldValue('dep')?.label;
                const workerCode =
                  formRef?.current?.getFieldValue('noticeworks')?.key;
                const workerName =
                  formRef?.current?.getFieldValue('noticeworks')?.label;

                const noticeInfo = `单位：${depName}、  通知人员：${workerName}`;

                const data = {
                  noticeId: formRef?.current?.getFieldValue('id'),
                  useid: guid(),
                  content: noticeInfo,
                  image:
                    'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                  depCode,
                  depName,
                  workerCode,
                  workerName,
                };

                if (formRef?.current?.getFieldValue('id')) {
                  //编辑状态
                  addNoticeItem(data);
                } else {
                  //新增状态
                  const res: any = [...updateItemData?.assigns, data];
                  setUpdateItemData({
                    ...updateItemData,
                    assigns: res,
                  });
                }
              }}
            >
              添加
            </Button>
          </ProForm.Group>
          <ProList
            dataSource={updateItemData?.assigns}
            showActions="hover"
            rowKey="useid"
            metas={{
              title: {
                dataIndex: 'content',
              },
              avatar: {
                dataIndex: 'image',
                editable: false,
              },
              actions: {
                render: (text: any, row: any, index: any, action: any) => [
                  <a
                    onClick={() => {
                      if (formRef?.current?.getFieldValue('id')) {
                        deleteNoticeItem(
                          formRef?.current?.getFieldValue('id'),
                          row?.id,
                        );
                      } else {
                        const res = updateItemData.assigns.filter(
                          (item: any) => item.useid != row.useid,
                        );
                        setUpdateItemData({
                          ...updateItemData,
                          assigns: res,
                        });
                      }
                    }}
                    key="link"
                  >
                    删除
                  </a>,
                ],
              },
            }}
          />
        </ModalForm>
        <ModalForm
          title="删除通知"
          width="800px"
          layout="horizontal"
          visible={deleteModalVisible}
          onVisibleChange={handleDeleModalVisible}
          onFinish={async (values) => {
            // console.log('提交数据', values);
            // Message.success('提交成功');
            const data = {
              id: currentRow?.id,
              reason: values.remark,
            };
            const isSuccess = await disNotice(data);
            if (isSuccess) {
              actionRef.current?.reload();
            }
            return isSuccess;
          }}
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
      </ProCard>
    </PageContainer>
  );
};
