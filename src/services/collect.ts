import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.94:5300/api';

const Api = {
  GetSampleLeafCollectPage: `${prefix}/LeafCollect/getPageData`, // 获取采集录入分页列表
  GetLeafCollectStatus: `${prefix}/LeafCollect/statusList`, //采集状态
};

// 获取采集录入分页列表
export async function getSampleLeafCollectPage(
  body: CollectApi.CollectPagesParams,
  options?: { [key: string]: any },
) {
  let str = '';
  str += body.workerCode ? `&workerCode=${body.workerCode}` : '';
  str += body.statusId ? `&statusId=${body.statusId}` : '';

  return request(
    Api.GetSampleLeafCollectPage +
      `?pi=${body.current}&ps=${body.pageSize}${str}`,
    {
      method: RequestEnum.GET,
      // data: {
      //     pi: body.current,
      //     ps: body.pageSize,
      //     workerCode: body.workerCode,
      // },
      ...(options || {}),
      skipErrorHandler: true,
    },
  );
}

//获取采集状态
export async function getLeafCollectStatus() {
  return request(Api.GetLeafCollectStatus, {
    method: RequestEnum.GET,
  });
}
