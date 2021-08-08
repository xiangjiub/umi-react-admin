import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.14:5300/api';

const Api = {
  CollectPlanAdd: `${prefix}/CollectPlan/add`, // 新增采集计划
  GetCollectPlanList: `${prefix}/CollectPlan/list`, // 获取采集计划列表
};

//新增采集计划
export async function addCollectPlan(
  body: CollectPlanApi.CreateCollectPlanParams,
) {
  return request(Api.CollectPlanAdd, {
    method: RequestEnum.POST,
    data: { ...body },
  });
}

//获取采集计划列表
export async function getCollectPlanList(taskId: string) {
  return request([Api.GetCollectPlanList, taskId].join('/'), {
    method: RequestEnum.GET,
  });
}
