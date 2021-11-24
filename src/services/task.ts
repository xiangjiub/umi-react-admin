import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.94:5300/api';

const Api = {
  SamplingTaskList: `${prefix}/SamplingTask/getPageData`,
  SampleTaskcreate: `${prefix}/SamplingTask/create`,
  SampleTaskEdit: `${prefix}/SamplingTask/update`,
  DeleteSamplingTask: `${prefix}/SamplingTask/discard`, //删除任务
  SamplingTaskPublish: `${prefix}/SamplingTask/publish`,
  GetDepList: `${prefix}/DemandDep/list`, //需求单位列表
  SamplingTaskItem: `${prefix}/SamplingTask/item`, //任务明细
  AddCollectPlan: `${prefix}/CollectPlan/add`, //新增采集计划
  CollectPlanList: `${prefix}/CollectPlan/list`, //获取采集计划列表
};

//获取任务分页数据
export async function getPageData(
  body: TaskApi.TaskPageParams,
  options?: { [key: string]: any },
) {
  return request(
    `${Api.SamplingTaskList}?pi=${body.current}&ps=${body.pageSize}&depCode=${body.depCode}`,
    {
      method: RequestEnum.GET,
      ...(options || {}),
      skipErrorHandler: true,
    },
  );
}

//创建任务
export async function SampleTaskcreate(body: TaskApi.CreateSampleTaskParams) {
  return request(Api.SampleTaskcreate, {
    method: RequestEnum.POST,
    data: { ...body },
  });
}

//编辑任务
export async function sampleTaskEdit(
  id: string,
  body: TaskApi.EditSampleTaskParams,
) {
  return request([Api.SampleTaskEdit, id].join('/'), {
    method: RequestEnum.PUT,
    data: { ...body },
  });
}

//删除任务
export async function deleteSamplingTask(body: TaskApi.DeleteTaskParams) {
  return request(Api.DeleteSamplingTask, {
    method: RequestEnum.DELETE,
    data: { ...body },
  });
}

//任务发布
export async function samplingTaskPublish(body: TaskApi.PushTaskParams) {
  return request(Api.SamplingTaskPublish, {
    method: RequestEnum.POST,
    data: { ...body },
  });
}

// 需求单位列表
export async function GetDemandDepList() {
  return request(Api.GetDepList, {
    method: RequestEnum.GET,
  });
}

//获取任务明细
export async function samplingTaskItem(id: string) {
  return request([Api.SamplingTaskItem, id].join('/'), {
    method: RequestEnum.GET,
  });
}

// 新增采集计划
export async function addCollectPlan(body: TaskApi.AddCollectPlanParams) {
  return request(Api.AddCollectPlan, {
    method: RequestEnum.POST,
    data: {
      ...body,
    },
  });
}

//获取采集计划列表
export async function getCollectPlanList(taskId: string) {
  return request([Api.CollectPlanList, taskId].join('/'), {
    method: RequestEnum.GET,
  });
}
