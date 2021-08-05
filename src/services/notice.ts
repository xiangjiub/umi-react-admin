import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.13:5300/api';
const Api = {
  GetNoticeList: `${prefix}/SamplingNotice/GetPageData`, // 获取通知分页列表
  deleteNotice: `${prefix}/SamplingNotice/Discard`, // 删除通知
  AddNotice: `${prefix}/SamplingNotice/add`, //新增通知
  GetItemList: `${prefix}/SamplingNotice/item`, //明细通知列表
  DeleteNoticeAssign: `${prefix}/SamplingNotice/RemoveAssign`, //删除通知人员id
  AddNoticeAssign: `${prefix}/SamplingNotice/addAssign`, //添加通知人员
  UpdateNotice: `${prefix}/SamplingNotice/update`, //更新通知
  PushNotice: `${prefix}/SamplingNotice/publish`, // 发布通知
  GetNoticeSlect: `${prefix}/SamplingNotice/SelectList`, //通知select
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
export async function getItemList(id?: string) {
  return request(`${Api.GetItemList}/${id}`, { method: RequestEnum.GET });
}

//删除通知人员明细
export async function deleteNoticeAssign(body: API.DeleteNoticeAssignParams) {
  return request(Api.DeleteNoticeAssign, {
    method: RequestEnum.DELETE,
    data: { ...body },
    skipErrorHandler: true,
  });
}

//新增通知明细数据
export async function addNoticeAssign(body: API.AddNoticeAssignParams) {
  return request(Api.AddNoticeAssign, {
    method: RequestEnum.PUT,
    data: { ...body },
  });
}

//更新通知
export async function updateNotice(body: API.UpdateNoticeParams) {
  return request(Api.UpdateNotice, {
    method: RequestEnum.PUT,
    data: { ...body },
  });
}

//提交通知
export async function pushNotice(id: string) {
  return request(`${Api.PushNotice}?id=${id}`, {
    method: RequestEnum.PUT,
    skipErrorHandler: true,
  });
}

//获取选择的通知
export async function getNoticeSlect() {
  return request(Api.GetNoticeSlect, {
    method: RequestEnum.GET,
  });
}
