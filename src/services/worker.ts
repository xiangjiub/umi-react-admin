import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const Api = {
  GetWorker: '/worker/GetBasicWorkers',
};

//获取工作人员
export async function getWorkerList() {
  return request(Api.GetWorker, {
    method: RequestEnum.GET,
  });
}
