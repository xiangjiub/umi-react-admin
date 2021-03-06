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
  // ??????table??????
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

  //????????????
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

  //????????????
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

  // ????????????????????????id
  const getNoticeItem = async (id?: string) => {
    const result = await getItemList(id).then();
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      const resWorkData = appendData?.assigns.map((item: any) => {
        const noticeInfo = `?????????${item.depName}???  ???????????????${item.workerName}`;
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

  // ??????????????????
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

  //????????????
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

  //????????????
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

  // ????????????????????????
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
    // console.log('?????????');
  }, [updateItemData]);

  //??????????????????
  const getdeplist = async () => {
    const data = await getCityAndHub();
    // console.log(data, '????????????');
  };

  const getMock = () => {
    request('/api/users/1').then((res) => {
      // console.log(res, '????????????');
    });
  };

  const columns: ProColumns[] = [
    {
      title: '??????',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '??????',
      dataIndex: 'status',
      search: false,
      ellipsis: true,
      copyable: true,
      // width: 800,
    },
    {
      title: '??????',
      dataIndex: 'statusId',
      hideInTable: true,
      valueEnum: {
        0: { text: '??????' },
        1: {
          text: '??????',
        },
        2: {
          text: '????????????',
        },
        '-1': {
          text: '??????',
        },
      },
    },
    {
      title: '????????????',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '??????',
      dataIndex: 'priority',
      search: false,
    },
    {
      title: '??????',
      valueType: 'option',
      width: 180,
      key: 'option',
      align: 'center',
      render: (_, record) => [
        <Fragment key="action">
          <Tooltip title="??????">
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
          <Tooltip title="??????">
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
          <Tooltip title="??????">
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
    <PageContainer content="??????????????????????????????????????????????????????????????????????????????????????????????????????">
      <ProCard direction="column" ghost>
        <ProTable<TableListItem>
          columns={columns}
          actionRef={actionRef}
          headerTitle="????????????"
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
              <PlusOutlined /> ??????
            </Button>,
          ]}
        />
        <ModalForm
          title={
            formRef?.current?.getFieldValue('id') ? '????????????' : '????????????'
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
            // console.log('FROM????????????', values);
          }}
          onFinish={async (value) => {
            if (formRef?.current?.getFieldValue('id')) {
              //??????

              const data = {
                id: formRef?.current?.getFieldValue('id'),
                title: value.title,
                priority: value.priority,
                attachment: '',
              };
              updateNoticeInfo(data);
            } else {
              //??????
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
              label="??????"
              placeholder="?????????????????????"
              rules={[
                {
                  required: true,
                  message: '????????????????????????',
                },
              ]}
            />
            <ProFormSelect
              width="md"
              options={[
                {
                  value: '??????',
                  label: '??????',
                },
                {
                  value: '??????',
                  label: '??????',
                },
                {
                  value: '??????',
                  label: '??????',
                },
              ]}
              label="????????????"
              placeholder="?????????????????????"
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
              label="??????"
              placeholder="???????????????"
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
              label="????????????"
              placeholder="?????????????????????"
              name="noticeworks"
            />
            <div
              style={{ height: '86px', display: 'flex', alignItems: 'center' }}
            >
              <Button
                type="primary"
                onClick={() => {
                  const depCode = formRef?.current?.getFieldValue('dep')?.key;
                  const depName = formRef?.current?.getFieldValue('dep')?.label;
                  const workerCode =
                    formRef?.current?.getFieldValue('noticeworks')?.key;
                  const workerName =
                    formRef?.current?.getFieldValue('noticeworks')?.label;

                  const noticeInfo = `?????????${depName}???  ???????????????${workerName}`;

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
                    //????????????
                    addNoticeItem(data);
                  } else {
                    //????????????
                    const res: any = [...updateItemData?.assigns, data];
                    setUpdateItemData({
                      ...updateItemData,
                      assigns: res,
                    });
                  }
                }}
              >
                ??????
              </Button>
            </div>
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
                    ??????
                  </a>,
                ],
              },
            }}
          />
        </ModalForm>
        <ModalForm
          title="????????????"
          width="760px"
          layout="horizontal"
          visible={deleteModalVisible}
          onVisibleChange={handleDeleModalVisible}
          onFinish={async (values) => {
            // console.log('????????????', values);
            // Message.success('????????????');
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
                message: '????????????????????????',
              },
            ]}
            name="remark"
            label="????????????"
            placeholder="?????????????????????"
          />
        </ModalForm>
      </ProCard>
    </PageContainer>
  );
};
