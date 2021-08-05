import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.196:5300/api';

const Api = {
  SamplingTaskList: `${prefix}/SamplingTask/getPageData`,
};

//获取任务分页数据
export async function getPageData(
  body: TaskApi.TaskPageParams,
  options?: { [key: string]: any },
) {
  return request(
    `${Api.SamplingTaskList}?pi=${body.current}&ps=${body.pageSize}`,
    {
      method: RequestEnum.GET,
      ...(options || {}),
      skipErrorHandler: true,
    },
  );
}
