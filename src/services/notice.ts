import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.196:5300/api';
const Api = {
  GetNoticeList: `${prefix}/SamplingNotice/GetPageData`, // 获取通知分页列表
  deleteNotice: `${prefix}/SamplingNotice/Discard`, // 删除通知
  AddNotice: `${prefix}/SamplingNotice/add`, //新增通知
  GetItemList: `${prefix}/SamplingNotice/item`, //明细通知列表
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

//新增通知
export async function addNotice(body: API.AddNoticeParams) {
  return request(Api.AddNotice, {
    method: RequestEnum.POST,
    data: {
      ...body,
    },
    skipErrorHandler: true,
  });
}

// 编辑页面获取通知页面列表
export function getItemList(id?: string) {
  return request(`${Api.GetItemList}/${id}`, { method: RequestEnum.GET });
}
