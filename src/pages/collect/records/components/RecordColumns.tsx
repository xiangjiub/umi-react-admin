import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from '../index';
import {
  getSampleLeafCollectPage,
  getLeafCollectStatus,
} from '@/services/collect';
import { message as Message } from 'antd';
import { ProFieldRequestData } from '@ant-design/pro-utils';

export default function useColumns() {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '取样任务',
      dataIndex: 'samplingTask',
      search: false,
    },
    {
      title: '采集方式',
      dataIndex: 'channel',
      search: false,
    },
    {
      title: '采集源',
      dataIndex: 'collectSource',
      search: false,
      render: (_, record) => [jsonToStr(record.collectSource)],
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '录入人员',
      dataIndex: 'workerName',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
    },
    {
      title: '采集状态',
      dataIndex: 'statusId',
      valueType: 'select',
      hideInTable: true,
      request: (params: any, props: any) => getStatus(params, props),
    },
  ];

  const jsonToStr = (val: any) => {
    if (typeof val == 'string') {
      try {
        const objectdata = JSON.parse(val);
        let strVal = '';

        const farmerName = objectdata?.farmerName;
        const Hth = objectdata?.Hth;
        const idCard = objectdata?.farmerPhone;
        const bankCard = objectdata?.bankCard;
        const collectDepName = objectdata?.collectDepName;
        const HubName = objectdata?.HubName;

        strVal += HubName ? `仓储中心：${HubName}、` : '';
        strVal += collectDepName ? `单位：${collectDepName}、` : '';
        strVal += farmerName ? `烟农姓名：${farmerName}、` : '';
        strVal += Hth ? `省合同号：${Hth}、` : '';
        strVal += idCard ? `身份证号：${idCard}、` : '';
        strVal += bankCard ? `银行卡号：${bankCard}` : '';

        return strVal;
      } catch (e) {
        console.log(e);

        return '';
      }
    }
  };

  //获取分页参数
  const getpages = async (params: any) => {
    console.log(params);
    const data = await getSampleLeafCollectPage(params).then();
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

  //采集状态
  const getStatus: ProFieldRequestData<any> = async (
    params: any,
    props: any,
  ) => {
    const result = await getLeafCollectStatus().then();
    const { resultType, appendData, message } = result;
    if (resultType == 0) {
      let res: any[] = [];
      appendData.map((item: any) => {
        let temp: any = {};
        temp['label'] = item.name;
        temp['value'] = item.id;
        res.push(temp);
        return item;
      });
      return res;
    } else {
      Message.error(message);
      return [];
    }
  };

  return { columns, getpages };
}
