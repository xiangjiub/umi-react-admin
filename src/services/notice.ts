import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.81:8087/api';
const Api = {
  GetNoticeList: `${prefix}/SamplingNotice/GetPageData`, // 获取通知分页列表
  deleteNotice: `${prefix}/SamplingNotice/Discard`, // 删除通知
};

// 获取通知列表
export async function getNoticeList(
  body: API.GetNoticePageParmas,
  options?: { [key: string]: any },
) {
  return request(Api.GetNoticeList, {
    method: RequestEnum.POST,
    // params: {
    //     ...params,
    // },
    data: {
      pi: body.current,
      ps: body.pageSize,
      statusId: body.statusId,
    },
    ...(options || {}),
    skipErrorHandler: true,
  });
}

// 删除通知
export async function deleteNotice(body: API.pushParmas) {
  return request(Api.deleteNotice, {
    method: RequestEnum.DELETE,
    data: {
      ...body,
    },
    // ...(options || {}),
    skipErrorHandler: true,
  });
}
