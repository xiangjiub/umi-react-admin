import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const prefix = 'http://192.168.1.94:85';

const Api = {
  GetWorker: '/worker/GetBasicWorkers',
  GetWorkerList: `${prefix}/worker/GetBasicWorkers`,
};

//获取工作人员mock
export async function getWorkerList() {
  return request(Api.GetWorker, {
    method: RequestEnum.GET,
  });
}

//获取工作人员
export async function getWorkerSelect(depcode: string) {
  return request(Api.GetWorkerList + `?depcode=${depcode}`, {
    method: RequestEnum.GET,
  });
}
